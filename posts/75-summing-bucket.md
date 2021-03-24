---
title: Summing bucket
experiment: 75
date: "2021-03-24"
permalink: summing-bucket
tags: elixir
---

Continuing on the thread of [message rollups](/posts/rollup-with-leaky-bucket), I tried to implement an example in Elixir, but it didn't work out.

My plan was to use 2 `GenServer`'s per account, one to count messages per minute, and the other to store a FIFO series of 15 data points (1 data point per minute resolution, so 15 points is 15 minutes worth of data points). My reasoning was that it would allow me to scale the window of the FIFO series based on the speed and acceleration of data.

What I learned is that 2 `GenServer`'s - each with their own timer - would get out of sync. So I'll need to refactor to do a single timer to control how the data drains betweens `GenServer`s or it might be easier to have a single `GenServer`.


## Code

```elixir
defmodule IngestBuffer do
  use GenServer

  require Logger

  @name __MODULE__
  @window 1000

  def start_link(_options) do
    GenServer.start_link(__MODULE__, nil, name: @name)
  end

  @impl true
  def init(_) do
    schedule_drain()

    {:ok, 0}
  end

  @impl true
  def handle_call(:increment, _from, counter) do
    {:reply, :ok, counter + 1}
  end

  @impl true
  def handle_info(:drain, counter) do
    IO.puts("Draining #{counter}")
    Messages.collect(nil, counter)

    schedule_drain()

    {:noreply, 0}
  end

  defp schedule_drain() do
    IO.puts "scheduling drain #{inspect self()}"
    Process.send_after(self(), :drain, @window) |> IO.inspect
  end
end

defmodule SeriesBucket do
  use GenServer

  @name __MODULE__
  @window 1000
  @length 15

  def start_link(_options) do
    GenServer.start_link(__MODULE__, nil, name: @name)
  end

  @impl true
  def init(_) do
    schedule_drain()

    {:ok, []}
  end

  @impl true
  def handle_call({:collect, value}, _from, series) do
    new_state = cond do
      length(series) >= @length ->
        [value|Enum.take(series, @length-1)]
      true ->
        [value|series]
    end

    {:noreply, :ok, new_state}
  end

  @impl true
  def handle_info(:drain, series) do
    IO.puts("Draining #{inspect series}")

    schedule_drain()

    {:noreply, 0}
  end

  defp schedule_drain() do
    IO.puts "scheduling drain #{inspect self()}"
    Process.send_after(self(), :drain, @window) |> IO.inspect
  end
end

defmodule Messages do
  def increment(_account_id) do
    GenServer.call(IngestBuffer, :increment)
  end

  def collect(_account_id, value) do
    GenServer.call(SeriesBucket, {:collect, value})
  end
end

children = [IngestBuffer, SeriesBucket]
Supervisor.start_link(children, strategy: :one_for_one)

:sys.trace(IngestBuffer, true)
IO.inspect(Process.whereis(IngestBuffer))
Messages.increment(1) |> IO.inspect

```
