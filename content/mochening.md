Title: mochening - Mock Sequel database objects with Mocha
Date: 2014-03-28 08:24
Category: Ruby
Tags: ruby, gem, mochening, sequel, mocha, mock
Slug: mochening
Author: bennyhallett
Summary: Mochening helps you mock Sequel database objects with Mocha

Mochening is designed to allow developers to easily mock out a Sequel database object with Mocha.

It allows you to set expectations on the Sequel object, in the same style that the Sequel database
object is used in your code.

    Mochening::Expect.from(mock_database) do |db|
      db[:table].where(a: 'a', b: 'b').select(:c, :d).all [{ c: '1', d: '1' }, { c: '2', d: '2' }]
    end

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

    Mochening::Expect.from(mock_database) do |db|
      db[:person].insert({ name: 'Roger', age: 30 })
    end
