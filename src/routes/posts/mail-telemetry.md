---
title: Mail telemetry
experiment: 220
date: "2021-07-25"
permalink: mail-telemetry
tags: elixir, telemetry
---

I've been working on sending on my metrics to AppSignal so I can have dashbaords for my SaaS project.

One area that didn't have an existing solution was for tracking email. I use [swoosh](https://github.com/swoosh/swoosh) to send and it didn't have any telemetry integration.

## Adding telemetry

So I [opened a PR](https://github.com/swoosh/swoosh/pull/614), all it took was using [`:telemetry.span`](https://hexdocs.pm/telemetry/telemetry.html#span/3) to output `:start`, `:stop` and `:exception` events.

### Before

```elixir
def deliver(email, config) do
  Mailer.deliver(email, parse_config(config))
end
```

### After

```elixir
def deliver(email, config) do
  metadata = %{email: email, config: config}

  # wrap with instrumentation
  instrument(:deliver, metadata, fn ->
    Mailer.deliver(email, parse_config(config))
  end)
end

defp instrument(key, metadata, fun) do
  metadata = Map.merge(metadata, %{mailer: __MODULE__})

  # start a span to capture how long it takes
  :telemetry.span([:swoosh, key], metadata, fn ->
    # run callback function and update metadata
    case fun.() do
      {:ok, result} -> {{:ok, result}, Map.put(metadata, :result, result)}
      {:error, error} -> {{:error, error}, Map.put(metadata, :error, error)}
    end
  end)
end
```

## Code

https://github.com/swoosh/swoosh/pull/614
