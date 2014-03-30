---
layout: post
title:  "Mocha Easter Egg"
date:   2014-03-29 17:22:00
---

There's a neat little easter egg hidden within the [Mocha](https://github.com/freerange/mocha) source code.

{% highlight ruby %}
thing.expects(:the_spanish_inquisition)
Mocha::ExpectationError: NOBODY EXPECTS THE SPANISH INQUISITION!
{% endhighlight %}

You can see the code on [the Mocha Github page](https://github.com/freerange/mocha/blob/master/lib/mocha/object_methods.rb#L66)
