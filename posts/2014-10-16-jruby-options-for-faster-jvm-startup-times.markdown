---
title: JRuby options for faster JVM startup times
description: Use these JRuby options to start up the JVM in half the time
---

A lot of the Ruby development I do lately has been using JRuby, which is fine. The problem I'm having comes about when I also practice [Test Driven Development](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd), which means running my tests. A lot. This can be painful when using JRuby, since the JVM can take quite some time to start up, resulting in a slower feedback loop.

I have recently discovered a set of JRuby options that can help the JVM fire up quicker. It's not instantaneous, but in my experience it cuts the start up time in half.

    JRUBYOPTS=""

There are also other tools that you could explore to help reduce the JVM startup time, like a and b
