---
title: Andon - What is it and why?
author: James Atherton
layout: post
categories:
  - Engineering
---
 
The Andon cord is a cord on a physical manufacturing line that you can pull to stop the entire line. If an item arrives at a station, a defect is found and it cannot be fixed before it leaves the station then the cord is pulled to stop the line. That is what it is why would you pull it? You pull it to stop the defect affecting the processes downstream, you pull it so the whole team can help resolve the problem, you pull it so you can identify the root cause and fix it, you pull it so you can build in quality to your product and process.
 
It supports the principle of Built-in Quality.
 
## How can we do this in development environment?

We need a system that identifies defects of which there are many systems but we have to have at least one:

* a team of QAs
* a suite of tests
* a developer manually checking their own work
* a product demo to the customer/stakeholder

Optimally we would want a suite of automated tests back up with people eyeballing their own changes before we push changes to the master repository.

When we identify a defect we need a time limit before we stop the line. On a manufacturing line this is 15-30 seconds. In a dev team this can be 15-30 min. Can you fix the problem quickly? If not stand up and tell the team to stop as you have found a problem. Once the problem has been discovered, everyone should stand up and discuss the issue:

* What is wrong?
* Do we know where it came from?
* How can we fix this issue?
* How can we prevent this from recurring in the future?

There are always different outcomes from these stand-ups, but frequent ones I have encountered are:

* missing tests
* the tests take too long to run so I didn’t bother
* a faulty spec
* failure to integrate early and often
* unexpected interactions of new features

The faster the feedback loop the faster we can identify and solve an issue; the fewer times that we should have to stop the line.
If we can automate a step in this process we should eg automation of test runs means we can test the whole system without human input, freeing humans from a  repetitive and morale destroying processes.

## Why?

To build a culture that is willing to stop, discuss and surface problems; to build in quality and get better at getting it right first time.


