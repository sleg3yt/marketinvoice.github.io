---
title: QuickCheck
author: Jason Dryhurst-Smith
layout: post
categories:
  - TechRadar
techradar:
  progress: 50
  category: tool
  level: assess
tags:
  - Testing
  - Data
  - Technology
---

QuickCheck is a specification for libraries in many languages for helping developers do property based testing.

Once the developer has formed sound specifications of properties that their program should exhibit the QuickCheck test runner generates random data (and lots of it) to test those properties. It then uses a shrinking algorithm to find the smallest possible data set that, if it can, breaks the test.

It's a great idea, but it's a very different methodology for writting and running unit and integration tests.  