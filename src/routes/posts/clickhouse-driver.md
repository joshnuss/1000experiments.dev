---
title: Clickhouse driver
experiment: 202
date: "2021-06-24"
permalink: clickhouse-driver
tags: elixir, clickhouse
---

For an analytics project I'm working on, I want to store the data in [ClickHouse](https://clickhouse.tech) using [Ecto](https://github.com/elixir-ecto/ecto).

U nfourtunately the current [clickhouse_ecto driver](https://github.com/clickhouse-elixir/clickhouse_ecto) is a bit outdated. It doesn't support the latest Ecto, but more importantly, it uses the `http` interface instead of the `tcp` interface.

My project needs to be high-throughput, so making tons of HTTP requests will be a lot slower than using a persistent TCP connection.

## Workaround attempts

Since ClickHouse supports Postgres's TCP protocol (port 9004) and MySQL's TCP protocol (port 9004). I figured I'd give those a shot.

So I tried using [postgrex](https://github.com/elixir-ecto/postgrex), but it run some postgres-specific when the connection is made, and those tables don't exist in ClickHouse.

I ran into a similar blocker with [myxql](https://github.com/elixir-ecto/myxql). The connection logic checks if certain capabilities are enabled, but those requests error out with ClickHouse.

## Writing a driver

Of course I could always write a new driver. It's a lot of work, but I decided to see what it takes.

The funny thing is, the hardest part is probably having to read the C++ code. Writing the Elixir part is a lot easier, since it has built-in DSL for binary encoding & decoding.

## Code

After a few hours of hair pulling, I worked out how to make a connection to the DB and parse the acknowledgment packet.

https://gist.github.com/joshnuss/e96ae827a454fb6de9da8282f6a37f9c

Next I'll have to implement to query packets (which will probably be a lot harder).

## Note

- Though it was hard to put this together, it was fun to have dive into a bunch of codebases. I had to look at the [Python](https://github.com/mymarilyn/clickhouse-driver) driver, [Go](https://github.com/ClickHouse/clickhouse-go) driver, and the [C++](https://github.com/ClickHouse/ClickHouse/blob/master/src/Client/Connection.cpp) code.
