---
title: "Summing bucket #2"
experiment: 76
date: "2021-03-24"
permalink: summing-bucket-2
tags: elixir
---

Yesterday, I tried to create a program that collects a series of points and computes the speed and acceleration of the series. My aim is to use it to help control the rate of emails that are sent to the user in a system that has many events.

When a spike of events happen, I want to detect the acceleration increase and scale the size of the bucket, ie to send one recap email with thousands of events in it, instead of thousands of indivudual email. And vice versa, when speed is low, an email with a single activity should be sent immediately.

I ended up using one `GenServer` to do the collection. It stores a count of how many events happened in the last minute. Every minute the counter is added to the series of samples. The samples series is a FIFO array that has 15 elements (measurements). Each measurement is one minute worth of data.

With this approach, the memory cost is low. It needs just 1 counter and 1 array of 15 elements.

There are a few more things to look into:

- Stop the process if the counter stays at zero for a few generations. That means it's no longer needed and just wasting memory.
- Use a `Registry` keyed by `account_id` to dynamically find or (when not found) start a new GenServer.
- Fire an event to drain all the messages for the account by sending out an email

## Code

```elixir
defmodule Series do
  use GenServer

  @name __MODULE__

  # drain counter every 60 seconds
  @drain_window 60 * 1000

  # 15 samples = 15 minutes
  @max_sample_size 15

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: @name)
  end

  def init(_) do
    schedule_drain()

    {:ok, %{
      counter: 0,
      speed: 0,
      acceleration: 0,
      length: 0,
      samples: []
    }}
  end

  def handle_call(:increment, _from, state) do
    {:reply, :ok, %{state | counter: state.counter + 1}}
  end

  def handle_info(:drain, state) do
    schedule_drain()

    len = Enum.min([state.length+1, @max_sample_size])
    samples = Enum.take(state.samples, @max_sample_size - 1)

    {speed, acceleration} = case List.last(samples) do
      nil -> {0, 0}
      last ->
        speed = (state.counter - last.value) / len
        acceleration = (speed - last.speed) / len

        {speed, acceleration}
    end

    sample = %{
      value: state.counter,
      speed: speed,
      acceleration: acceleration
    }

    IO.puts "draining..."
    IO.inspect state.samples, label: "samples"
    IO.inspect sample, label: "sample"


    {:noreply, %{state |
      counter: 0,
      speed: speed,
      acceleration: acceleration,
      length: len,
      samples: [sample|samples]
    }}
  end

  defp schedule_drain do
    Process.send_after(self(), :drain, @drain_window)
  end

  def increment do
    GenServer.call(@name, :increment)
  end
end

```
