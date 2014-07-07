---
layout: post
title:  "Default hash values in Ruby"
date:   2014-03-20 17:44:00
---

Hashes in Ruby have an interesting property in that you can specify a default value for any item in the Hash. When we try to get a value out of a hash that doesn't exist, we get nil.

{% highlight ruby %}
x = Hash.new
assert_nil x[:empty]
{% endhighlight %}

This isn't unexpected, but not simply because the value doesn't exist, but because the default value is nil.

We can create a new hash with a default value of 1, and when we ask for a value that isn't in the hash, we get 1.

{% highlight ruby %}
x = Hash.new 1
assert_equal 1, Hash[:default]
{% endhighlight %}

This property can lead to some interesing behaviour when we pass in an array as the default value.

{% highlight ruby %}
x = Hash.new []
x[:one] << 'one'
x[:two] << 'two'
{% endhighlight %}

At first glance, we probably expect `x[:one]` to be `['one']` and `x[:two]` to be `['two']`, but this isn't the case. In fact, both values, as well as any values for keys which don't exist in the hash, will be `['one', 'two']`.

This is because the default value for the hash isn't **an** array, it's **this** array.

If we want the default value to be a new, empty array, we need to use a block to specify the default value.

{% highlight ruby %}
x = Hash.new { [] }
x[:one] << 'one'
x[:two] << 'two'
{% endhighlight %}

This problem could be used as a good interview question for candidates for a Ruby developer position.
