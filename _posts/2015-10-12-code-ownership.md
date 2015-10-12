---
title: Code Ownership
author: Dan Karger
layout: post
categories:
  - Engineering
---
One of the issues that any development team greater than one faces is the question of how to handle code ownership. Who should work on what code? Who is responsible for code quality?

Many software companies practise individual code ownership, where certain developers “own” certain modules and are the only developers who can make changes to them. This has some benefits, in that responsibility is clear and developers become knowledge experts in their particular area, which may help speed and efficiency. There are however major pitfalls, the most obvious of which is the “bus factor”: if only one person understands a particular area what happens if they get hit by a bus? Even in a less morbid situation, developers can be delayed waiting for changes needed in other modules, refactors become difficult and it can lead to a certain stagnation (an argument [Facebook](https://code.facebook.com/posts/263824650408138/engineering-culture-series-code-ownership/)  suggests).

For these reasons “Extreme Programming” (XP) mandates [collective code ownership](http://guide.agilealliance.org/guide/cco.html), everyone can make changes to any part of the codebase and the team as a whole takes responsibility for code quality. This can have its own problems, one of the main ones is which is confusing “collective” ownership with “no ownership”.

There are gradations between the two: Martin Fowler talks of [“Weak code ownership”](http://martinfowler.com/bliki/CodeOwnership.html) where anyone can edit the code but there is still one “expert” that takes responsibility for a module. Teams can tend towards this situation even if ownership is “collective” as whenever a complicated module requires amendments it is always tempting to have the developer who knows most about it do the work. It’s a positive feedback loop that results in a situation not very different to the strong individual code ownership you are trying to avoid.

To have real collective ownership requires active effort to ensure knowledge of complex areas is diffused throughout the team.  One good tool for seeing who is working on what code is [gource](https://code.google.com/p/gource/) a software version control visualization tool. Below you can see a video showing how individuals on our team amended the codebase over the last couple of months.

<iframe style="display: block" src="http://www.youtube.com/embed/BCWKCkMEsa8" width="625" height="500"></iframe>

Watch out for the cool [explosion](https://www.youtube.com/watch?v=Sqz5dbs5zmo) when we fixed a line endings inconsistency.

When implementing a complex new area of functionality clearly one or two developers working on it will become the “experts”. However once this is “live” we try to ensure that they do not remain the “go-to” guy for any changes and extensions of that area. They may be best placed temporarily to do the work but in the long run it is healthiest to have the knowledge diffused throughout the team. In fact if another developer can’t quickly pick up a particular module it may suggest a “[code smell](http://en.wikipedia.org/wiki/Code_smell)” and signify deeper problems that need fixing. But code smells are for another post...