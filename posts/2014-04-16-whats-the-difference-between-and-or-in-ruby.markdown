---
layout: post
title:  "What's the difference between and, or, && and || in Ruby?"
date:   2014-04-16 06:46:00
---

After inheriting my first Rails project, one of the first things that confused me was the multiple boolean logic operators. In Ruby, the operators include:

* &&
* ||
* and
* or

`==` and `===` are also included, but we can ignore these for the sake of this post.

**So what's the difference then?**

*The first difference is precedence.*

`&&` has the highest precedence, followed by `||`. Both and and or have the same precedence.

{% highlight ruby %}
false and false or true
=> true

false and false || true
=> false
{% endhighlight %}

In the first example here, the expression is evaluated in order. So `false and false` is `false`, and taking that result, `false or true` is `true`.

In the second example, the `||` section is evaluated first. So `false || true` is `true`, and taking that result, `false and true` is false.

*The other difference is how they are used.*

For boolean logic, generally `&&` and `||` are used.

{% highlight ruby %}
def can_read?
  (daytime? || inside?) && wearing_glasses?
end
{% endhighlight %}

The and/or operators are generally used to chain methods together. This can be done because in Ruby, `nil` and `false` always resolve to `false`, where everything else resolves to `true`.

{% highlight ruby %}
start_engine and drive
{% endhighlight %}

In the example above, if the engine fails to start, then the vehicle won't drive. Another example may be the movement of a child. 

{% highlight ruby %}
def move
  walk or crawl or roll
end
{% endhighlight %}

In this example, a child can move in multiple ways, but prefers the most efficient method. They will attempt to walk, and only attemt to crawl if walking fails. Similarly, they will only attempt to roll if crawling fails.

Chaining methods together like this is a useful tool for creating clean, easy to understand code.
