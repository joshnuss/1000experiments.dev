---
title: Serverless Background Jobs
experiment: 232
date: "2022-06-29"
permalink: serverless-background-jobs
tags: async, queue, serverless
---

Serverless is great because you don't have to organize computing resources based on servers.

When the workload dips, why pay for an idle CPU? And vice-verse, when workload increases, why manually deploy more servers.

With traditional server-based deploy, humans are responsible for monitoring and re-sizing. That why serverless is great, because it removes the need to manually size compute resources.

So why isn't there a good queing solution for serverless? Cloud functions solve the sizing problem for web server nodes, but worker nodes have the same workload issues, some times more compute is needed, othertimes less compute is needed. So it seems ideal for serverless.

## Asynchronous

What's unique about async workloads is that since they execute outside the caller, we need a way to record where they completed. This is where some coordintion is neeed.

If there was a registry (postgres, bigtable, mongo) that tracked the state of each job, then jobs could be retried when they fail.

This is very similar to [Oban](https://github.com/sorentwo/oban) or [Resque](https://github.com/resque/resque), execept using serverless compute.

## Delayed

It should support workloads that start in the future, aka scheduled for a later date. For example, sending an email tomorrow at 9am.

## Recurring

It should handle recurring workloads, aka repeating scheduling. For example, sending an email every morning at 9am.

## Immediate

This is the most common workload, where the job is queued immediately.

## Retries and backoff

When a job executes, it should reply back to the coordinater with a receipt, telling the coordinator if the job succeeded or fails. A failure results in rescehduling the work for later according to a backoff strategy.

If a job times out, the coordinator should detect the missing receipt and considered it a failure and reschedule for retry.

This could result in work being done multiple times. For many workloads this is fine (ie sending an email twice isn't a biggie). So it's up to the developer to make sure one-time jobs are re-entrant.

## Throttling

When a burst of jobs are queued, we may want to throttle the queue. For example Shopify API request are throttled, so the jobs that make these requests should obey the same throttling logic.

## Packaging

All the workers need to be packaged so they can be deployed to the cloud. The coordinator then call the entry point cloud function which calls the worker

## Endpoints

Here are the endpoints the coordinator should support:

- Scheduling a job
  - Execute immediately
    ```
    POST /job { worker: 'worker-name', args: { .. } }
    ```
  - Execute later
    ```
    POST /job { worker: 'worker-name', args: { .. }, runAt: '2020-01-01 10:00:00 AM' }
    ```
  - Execute on a recurring schedule
    ```
    POST /job { worker: 'worker-name', args: { .. }, cron: '...' }
    ```
- Job replying
  - Success
    ```
    POST /job/:id/receipt` { status: 'success' }
    ```
  - Failure
    ```
    POST /job/:id/receipt { status: 'failure', error: ... }
    ```

## Polling

The coordinator would need to do some polling

- Checking for scheduled jobs to run and execute them
- Check for timed out jobs and mark them failed
- Check for recurring jobs to schedule
- Purge completed jobs

## Code

Each cloud function is wrapped to catch error and report results the coordinator. If the worker reports an error or fails to report any results within a window, the job is rescheduled.

```javascript
// wrap serverless function, to handle errors and report results
export default wrap((request, response) => {
  ...
})

function wrap(callback) {
  return (request, response) => {
    try {
      const value = callback(request, response)
      Coordinator.report('success', request.body.jobId)
      return value
    } catch (e) {
      Coordinator.report('error', request.body.jobId)
    }
  }
}
```

## Repo

https://github.com/joshnuss/vercel-serverless-jobs

## Conclusion

In the end I was [recommended](https://twitter.com/cstrnt/status/1542482219939274752) [Quirrel](https://quirrel.dev), and it looks really promsing.
So I'll use that instead. Hurray for saving a bunch of time!
