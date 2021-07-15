---
title: Grouping by date
experiment: 210
date: "2021-07-15"
permalink: grouping-by-date
tags: elixir, carrierwave
---

For my [startup project](https://getcarrierwave.com), I built an integration with [Skubana](https://skubana.com).

Every few hours, my app calls their API to pull down the latest shipments. The range of data is specified as a `from` and `to` date params in the query string.

Ideally I make the requests in time batches. I need some code to take a `to` and `from` time and split it up.

## Code

So I came up with this, it splits the time in equal chunks, and any remainder time is a smaller chunk at the end

```elixir
defmodule DateUtils do
  def time_blocks(from, to, size) do
    seconds = DateTime.diff(to, from)
    groups = (seconds / size) |> Float.ceil() |> trunc()

    blocks = generate_blocks(from, to, size, groups)

    Enum.zip([from|blocks], blocks)
  end

  defp generate_blocks(from, to, size, groups) do
    for n <- 1..groups do
      if n == groups do
        to
      else
        DateTime.add(from, n*size, :second)
      end
    end
  end
end
```

## Demo

```elixir
> from = %DateTime{year: 2000, month: 2, day: 29, zone_abbr: "UTC",
               hour: 12, minute: 0, second: 0, microsecond: {0, 0},
               utc_offset: 0, std_offset: 0, time_zone: "Etc/UTC"}
> to = %DateTime{year: 2000, month: 2, day: 29, zone_abbr: "UTC", 
               hour: 23, minute: 0, second: 0, microsecond: {0, 0},
               utc_offset: 0, std_offset: 0, time_zone: "Etc/UTC"}

> DateUtils.time_blocks(from, to, 60*60*4) |> IO.inspect
[
  {~U[2000-02-29 12:00:00Z], ~U[2000-02-29 16:00:00Z]},
  {~U[2000-02-29 16:00:00Z], ~U[2000-02-29 20:00:00Z]},
  {~U[2000-02-29 20:00:00Z], ~U[2000-02-29 23:00:00Z]}
]
```
