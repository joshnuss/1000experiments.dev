---
title: Better process management
experiment: 67
date: "2021-03-21"
permalink: flowchart-process-task
tags: idea
---

One thing that computers and humans have in common is processes. In fact, technology companies can be thought of as hybrids of humans and computers. Both are completing tasks. Some tasks are more suitable to humans, and other are better suited for our number crunching frieds. Many tasks start out as human tasks, and eventually move over to computing.

These processes are held together by a mix of user defined computer programs, off the shelf software like task lists, and tribal knowledge.

But what happens if that knowledge was codified? and I don't mean in a manual. I mean codified with general purpose software for building human/computer processes.

Here are some examples of what it could solve:

- Listing a new product on a web store.
- Review a loan application/
- Researching an investment
- Planning an event

A system like this would have several parts:

## Tasks

These are activities performed by a person or computer. They typically have a deadline, and they have rules for what happens when it's taking too long, like reminders or escalations.

## Branches

A branch is a decision process. It takes an input and makes a decision. It can be a decisioned assigned to a human, ie "Should we buy this stock" or "is this company investable" or it can be handled by a user-defined computer program.

## Queues

If you think of a large process, it may have many tasks, all performed by different people. For example, to post a new product on a website, a photographer will need to take pictures. There could be many new products in progress. But there is only one photography queue. It represents a view of a specific type of task across all process.

Workflows also have an intake queue and completion queue. The intake is accessible via an API, the outake is a webhook.

Tasks also have their own queues, so workers (human or computer) only need to care about a specific queue.

Queues can also have different styles:

- **Serial queue**: only one operation can be handled at a time (human or computer)
- **Parallel queue**: multiple operations can be execute at a time. The max paralelization can be 1 (serial) to infinity
- **Priority queue**: operations in the queue are by a priority rather than in-order. Priority selection is a decision process.

## Serial/Parallel

Activities in the workflow can be executed in parallel or sequentially:

- Example of parallel: the photographer can photograph a photo (task) while the social media team prepares for launch (task)
- Example of sequential: requesting a sample for the vendor (task) must happen before evaluating the product (task)

The deadline of a sequential tasks can be inferred from the sum of the set. In the case of a parallel set of tasks, their is a deadline set on each task and a separate deadline on the parallel set.

## Modification

For processes to be flexible they must be able to change. That allows processes to start out small and grow over time.

Modification can happen in many ways:

- Adding or removing branches
- Adding or removing tasks
- Splitting tasks (turning 1 tasks into multiple)
- Joining tasks (turning multiple tasks into one)
- Parallelizing a set of tasks
- Turning parallel steps into synchronous (serial) steps
- Switching a task or decision from a human process to a computer process (and vice versa)

## Migration

A production process may be currently excuting instances, so to modify a workflow we must decide how to migrate the existing instances before deploying any changes.

There are several strategies for migration:

- keep running the old version of the workflow. ie keep the old version of the workflow around for current instances
- adding/removing a new branch can kick off a temporary workflow to re-bucket the open tasks.
- parellelizing or serializing can problably be done without any danger
- running user-defined code to migrate it

## Symbology

The designer of the workflow should be able to adjust the size of the elements. For example, less important or rarely used parts of the workflow should take up less space.

Each element can have an it's own icon and color to make it easy to follow visually.

## Production view

When a workflow is executing in production, we can show how many instances have passed thru each stage, and how many are currently at each stage.
This will make it easier to modify the workflow, because we can see how often a branch gets used - or if it never got used at all.
