---
title:  "Mocha Easter Egg"
description:  "Mocha Easter Egg"
---

There's a neat little easter egg hidden within the [Mocha](https://github.com/freerange/mocha) source code.

    thing.expects(:the_spanish_inquisition)
    Mocha::ExpectationError: NOBODY EXPECTS THE SPANISH INQUISITION!

You can see the code on [the Mocha Github page](https://github.com/freerange/mocha/blob/master/lib/mocha/object_methods.rb#L66)
