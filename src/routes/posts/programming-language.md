---
title: Programming language
experiment: 191
date: "2021-05-18"
permalink: programming-language
tags: idea
---

This is the programming language I wish existed.

The ideas are basically a mix or Elixir/Erlang, Ruby and JavaScript.

## Aims

- A language designed for building business applications
- Expressive and minimal
- Functional, imperative and declarative.
- Actor model, no OOP.
- Isomorphic
- Cloud-native
- Distributed VM

## Multi-paradigm

It should support functional, imperative, and declarative programming models. Functional is the default. 

```
# functional
f(x) -> x * 2
```

It supports imperative too, but it's scoped. Imperative code is more for lower layers of an app or for libraries. There should be linting rules that block its usage in higher level business logic.

```
mutable f(x) ->
  x += 2 # mutation allowed here
  x
```

Declarative syntax is also supported. It makes it easy to define configuration systems or addons to the language.

```
interpreter belongs_to(context) ->
  grammar ...
```

Usage:

```
module Order
  belong_to :user
end
```

## Isomorphic

The same syntax would run on the server and on the client (browser). That means all nodes can message each other without serializing/deserializing, regardless if they are a browser or a server.

To make that possible, multiple transport layers exist under the hood:

- For comms between different machines: TCP
- For comms between VMs on the same machine: Pipes
- For comms between server and browser: WebSockets
- For comms from external apps: HTTTP

All messages are serialized and transported using the correct layer, without developer intervention.

## Cloud-native distributed-VM

Unlike erlang, it's designed to be deployed to the cloud. It works more like a "Function as a Service" deploy. That means there is a cloud-based registry of actors.

```
> deploy
Deploying cart.api.domain.tld
Deploying checkout.api.domain.tld

> curl cart.api.domain.tld/status
UP
```

## Queues

Each actor has a queue. When an actor sends another a a message, that means it contacts the registry to locate the actor and then places a message on that actor's queue.

The actor can specifiy if it prefers a prioritized queue, FIFO queue or shared queue (multiple workers).

## Reactive actor-model

It uses the Actor Model instead of OOP, because the Actor Model is more effective for distributed and parallelized workloads.
Each actor has a queue and is addressable by name or id. The name can be public and accessible by browser, or private and only accessible by other actors in the cluster.
Messages between actors are async by default, because they go on the queue first, but the sender can block waiting for a response.
This flavor of Actor Model can be reactive too. That means the active can publish changes, and other actors can subscribe to those broadcasts.

This part is basically a mix of erlang gen_server's and pub-sub. But unlike erlang, there is no difference between an actor and a process. The lowest level primitive is an Actor.

### Example

```
actor Cart
  strategy :temporary, timeout: 24.hours

  def initialize
    @items = []
  end

  on add(items)
    @items = [...@items, ...items]

    broadcast {:added, items}
    broadcast {:updated, self}
  end

  on remove(item)
    @items = @items . without(item)

    broadcast {:removed, item}
    broadcast {:updated, self}
  end

  on clear
    @items = []

    broadcast :cleared
    broadcast {:updated, self}
  end
end
```

Each actor is addresable thru a "registry", which is a "name service" the hosting system provides. Public actors can have DNS too, that makes them accsessible via http/websocket/tcp.

Like in erlang, actors can "monitor" or "link" with other actors. When an actor monitors another, they receive notifications about that actor. When an actor links with another, if either fails, the other is terminated too.

## Supervision

Supervisors are a special type of actor that monitors other actors and deals with failures. ie restarting the actor, or using a fallback method.

## Meta-programming

Works together with the "declarative" facet of the language. You define an interpreter/grammar, and it can generate code.

I'm not sure if Ruby's meta-programming style is possible in a functional world. But I prefer that approach to macros - even if macros are faster - because they feel harder to write.

## Notes

- These ideas have tons of holes in them, just wanted to write something down, in case I ever come back to it.
- I built some of this a few years back. https://github.com/joshnuss/topaz
