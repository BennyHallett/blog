---
layout: post
title:  "Mocha Easter Egg"
date:   2014-03-29 17:22:00
---

There's a neat little easter egg hidden within the [Mocha](https://github.com/freerange/mocha) source code.

    thing.expects(:the_spanish_inquisition)
    Mocha::ExpectationError: NOBODY EXPECTS THE SPANISH INQUISITION!

You can see the code on [the Mocha Github page](https://github.com/freerange/mocha/blob/master/lib/mocha/object_methods.rb#L66)
