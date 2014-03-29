---
layout: post
title:  "mochening - Mock Sequel database objects with Mocha"
date:   2014-03-28 08:24:00
---

Mochening is designed to allow developers to easily mock out a Sequel database object with Mocha.

It allows you to set expectations on the Sequel object, in the same style that the Sequel database
object is used in your code.

{% highlight ruby %}
Mochening::Expect.from(mock_database) do |db|
  db[:table].where(a: 'a', b: 'b').select(:c, :d).all [{ c: '1', d: '1' }, { c: '2', d: '2' }]
end
{% endhighlight %}

In the most recent version only Mocha expectations are supported. A future version will include stubs.

The methods available for expectations include:

* [:table_name]
* where
* select
* insert
* all
* first

**Examples**

*Inserting data into a table*

{% highlight ruby %}
Mochening::Expect.from(mock_database) do |db|
  db[:person].insert({ name: 'Roger', age: 30 })
end
{% endhighlight %}
