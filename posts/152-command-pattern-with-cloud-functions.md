---
title: Command pattern with cloud functions
experiment: 152
date: "2021-04-24"
permalink: command-pattern-with-cloud-functions
tags: svelte, code-video, supabase
---

For the [code animation project](/tag/code-video), I am planning to use a [command store](/posts/command-store).

In my initial prototypes I used a [stores to represent the data](/posts/command-store-with-live-updating), but stores means local state. So this experiments explores using remote state, with the local stores reflecting.

## Cloud functions

The commands will happen in a cloud function that will update [supabase](https://supabase.io):

```javascript
// routes/animations/[id]/commands/execute.js
import { client } from '$lib/db'
import * as commands from '$lib/commands'

export async function post(req) {
  // create client for the specific user
  const supabase = client(req.headers.authorization)

  const { id } = req.params
  const { name, command: commandName, args } = req.body
  const command = commands[commandName]

  // if command handler wasn't found, we cannot continue
  if (!command) {
    return {
      status: 406,
      body: `Unknown command ${commandName}`
    }
  }

  const { data: animation, error } = await supabase
    .from('animations')
    .select('*')
    .match({id})
    .single()

  // if animation wasn't found return 404
  if (animation == null) {
    return {
      status: 404,
      body: 'Animation not found'
    }
  }

  const {state: updated, previous} = command.execute(animation, args)
  updated.pointer = animation.pointer + 1

  // update animation. triggers insert in `animation_versions` table
  await supabase
    .from('animations')  
    .update(updated)
    .match({id})

  // wipe out all commands past the pointer index
  // this is in case we undid a bunch of commands
  // then if we insert a new command,
  // we cannot redo commands that are ahead in the stack
  await supabase
    .from('animation_commands')
    .delete()
    .eq('animation_id', id)
    .gte('pointer', updated.pointer)

  // save command
  await supabase
    .from('animation_commands')
    .insert({
      animation_id: id,
      user_id: animation.user_id, // not needed once policy is setup
      index: updated.pointer,
      type: commandName,
      args,
      previous
    })

  return {
    status: 200,
    body: JSON.stringify(updated)
  }
}
```

## Undo

```javascript
// routes/animations/[id]/commands/undo.js
import { client } from '$lib/db'
import * as commands from '$lib/commands'

export async function post(req) {
  const supabase = client(req.headers.authorization)
  const { id } = req.params
  const { data: animation } = await supabase
    .from('animations')
    .select('*')
    .match({id})
    .single()

  if (animation == null) {
    return {
      status: 404,
      body: 'Animation not found'
    }
  }

  if (animation.pointer == 0) {
    return {
      status: 406,
      body: 'There are no changes to undo.'
    }
  }

  const { data: log } = await supabase
    .from('animation_commands')
    .select('*')
    .match({animation_id: id, counter: animation.pointer})
    .single()

  const command = commands[log.type]
  const updated = command.undo(animation, log.args, log.previous)
  updated.pointer = animation.pointer - 1

  const { data: returnedData } = await supabase
    .from('animations')  
    .update(updated, { returning: 'representation' })
    .match({id})

  return {
    status: 200,
    body: JSON.stringify(returnedData)
  }
}
```

## Redo

The redo function is similar to undo, except it calls `handle.execute()` instead of `handler.undo()`.

```javascript
import { client } from '$lib/db'
import * as commands from '$lib/commands'

export async function post(req) {
  const supabase = client(req.headers.authorization)
  const { id } = req.params
  const { data: animation } = await supabase
    .from('animations')
    .select('*')
    .match({id})
    .single()

  if (animation == null) {
    return {
      status: 404,
      body: 'Animation not found'
    }
  }

  const { data: log } = await supabase
    .from('animation_commands')
    .select('*')
    .match({animation_id: id})
    .order('counter', { ascending: false })
    .limit(1)
    .single()

  if (animation.pointer == log.counter) {
    return {
      status: 406,
      body: 'There are no changes to redo.'
    }
  }

  const command = commands[log.type]
  const { state: updated } = command.execute(animation, log.args)
  updated.pointer = animation.pointer + 1

  const { data: returnedData } = await supabase
    .from('animations')
    .update(updated, { returning: 'representation' })
    .match({id})

  return {
    status: 200,
    body: JSON.stringify(returnedData)
  }
}
```

## Client creation

A client can be created with or without user authorization, so the authorization is optional.

```javascript
// lib/client.js
import { createClient } from 'supabase'

// create a public client with or without user authorization
export function client(authorization = null) {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
    { headers: { authorization } }
  )
}
```

## Versions

All changes are captured with a trigger, and an insert is made into the `animation_versions` table.

It might seem like it's duplicating data from the `animation_commands` table, but it's not. The `versions` table is an append-only log, showing each step that was made. The `commands` table, contains commands that can be undone, if several changes are undone and new change is made, those undone changes are deleted, since they can no longer be applied.


```sql
create or replace function handle_updated_animation()
returns trigger as $$
begin
  insert into animation_versions (animation_id, user_id, name, data, timestamp)
  values (old.id, old.user_id, old.name, old.data, old.updated_at);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_animation_updated
  after update on animations
  for each row execute procedure handle_updated_animation();
```

## Code

https://github.com/joshnuss/supabase-command-test

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619255647/1000experiments.dev/command-db_k8fpj3.mp4" controls/>

## Notes

- Multiple writes can impact data consitency, therefore they really should happen inside a transaction. Since transactions are [not yet supported](https://github.com/supabase/supabase/discussions/526), a fallback is to use a stored procedure, or accept that incosistency can happen, and punt it down the road, like I'm doing here.
- Thise code can be refactored a lot. I prefer not to do queries inside an endpoint/cloud function, but this is just a rough draft.
