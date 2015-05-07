---
title: Creating a command line app in Elixir with Anubis
description: Learn how to create a simple command line application using Elixir and the Anubis framework. We will be creating a simple application to manage our TODO lists.
date: "May 5th, 2015"
---

## INTRODUCTION

...

### Creating the shell of our application

Firstly we want to create our app

    $ mix new extodo --module ExTodo
    $ cd extodo

Add anubis as a dependency and install it

    deps: [{:anubis, "~> 0.3.0"}]

    $ mix do deps.get, compile

Next up we want to build our TodoList. Should be essentially an array but lets
do it properly

First off we want to be able to create a new todo list, so lets write a test

    test "create a new todo list" do
      assert [] == ExTodo.TodoList.create
    end

Run that and it fails. Lets implement it. Create a file `./lib/extodo/todo_list.ex`
and create the `ExTodo.TodoList` module, and implement `create`

    defmodule ExTodo.TodoList do
      def create, do: []
    end

Now our test passes.

Next lets try to add an entry to the list. We start again by writing another
test.

    test "add an item to the list" do
      list = ExTodo.TodoList.create

      one = ExTodo.TodoList.add(list, "ONE")
      two = ExTodo.TodoList.add(one, "TWO")

      assert ["ONE"] == one
      assert ["TWO", "ONE"] == two
    end

Again, we implement this. Lets use the `[head|tail]` operator to implement this:

    def add(todo, item), do: [item|todo]

This works great but we have one limitation. What happens if we add the same
item twice? We want to ensure that each element only appears in our list once,
so lets write a test exposing this limitation.

    test "add one item to the list twice" do
      list = ExTodo.TodoList.create
      |> ExTodo.TodoList.add("Same")
      |> ExTodo.TodoList.add("Same")

      assert ["Same"] == list
    end

Our test exposes our flaw, and we get `["Same", "Same"]` rather than our expected
`["Same"]`. The `Enum` module has a handy built in function we can use to ensure
our list is unique. Modify our existing `add` function by passing our newly
modified list through `Enum.uniq`:

    def add(todo, item), do: [item|todo] |> Enum.uniq

Next we should do the opposite and allow ourselves to remove items from the
list.

    test "remove an item from the list" do
      list = ExTodo.TodoList.create
      |> ExTodo.TodoList.add("AAA")
      |> ExTodo.TodoList.add("BBB")
      |> ExTodo.TodoList.add("CCC")

      assert ["CCC", "AAA"] == ExTodo.TodoList.remove("BBB")
    end

We could easily use the built in function `List.delete` to remove the item, but
lets go it alone and use [tail
recursion](http://stackoverflow.com/a/37010/109246) to implement this.

    def remove(todo, item), do: _remove(todo, item, [])

    defp _remove([], item, output), do: output |> Enum.reverse
    defp _remove([item|tail], item, output), do: _remove(tail, item, output)
    defp _remove([head|tail], item, output), do: _remove(tail, item, [head|output])

As we see here, our `remove` function simply delegates to the private `_remove`
function. Here we use a combination of tail recursion and [pattern
matching](http://elixir-lang.org/getting-started/pattern-matching.html) to
achieve our goal.

Let's go over the 3 function heads individually:

* The first is our terminating clause. When out input list has been exhausted,
  we can return the output list. Note that we reverse the list, which is
commonly required when using tail recursion to process a list.
* The second function head is invoked when the head of our input list is the same
  as the item we're looking to remove. In this case, we continue our processing
without including the item in the output list.
* The final one is invoked in most cases, when the head of the input list is not
  the item we're looking to remove. We add the item to the output list and
continue on.

We've got ourselves a nice model for out Todo List but we're missing something:
Persistence

Let's save our list to a file, overwritting it if it already exists.

It's worth talking about format at this point. We need to agree on a simple
format to store our todo list as. Let's just use a simple text based file, with
each item in the todo list on a new line.

Again, we should start by writing a test. Lets create a new test file, to
contain our tests regarding persistence, and then add our first test.

    defmodule PersistenceTest do
      use ExUnit.Case

      @filename '/tmp/todolist'

      setup do
        on_exit fn -> @filename |> File.rm end
      end

      test "save a todo list" do
        list = ExTodo.TodoList.create
        |> ExTodo.TodoList.add("first")
        |> ExTodo.TodoList.add("second")
        |> ExTodo.TodoList.add("third")
        |> ExTodo.TodoList.save(@filename)

        contents = File.read!(@filename)

        assert "third\nsecond\nfirst" == contents
      end

    end

In this test module we've created a setup task that will delete our temporary
todo list after it's created. If you're on Windows, you may need to change the
location of the file in _@filename_

Our test simply creates a new Todo List, saves it, and asserts that the contents
of the file are as we expect.

With that test failing, lets save our list.

Create a new save function in the ExTodo.TodoList module, that looks like:

    def save(list, filename), do: File.write(filename, Enum.join(list, "\n"))

We simply convert the list into a newline separated string, and write that out
to the given filename.

Our last item required for our TodoList module is loading the file back out.
We've almost already done it in our test, so this one should be fairly straight
forward.

Lets add our test

    test "load a todo list" do
      File.write(@filename, "third\nsecond\nfirst")

      list = ExTodo.TodoList.load(@filename)

      assert ["third", "second", "first"] == list
    end

And we can implement it by reading in the filename and splitting the string on
the newline character. We must be careful to include the trim option, so that we
don't get empty items if the file ends in a newline

    def load(filename), do: filename |> File.read! |> String.split("\n", trim: true)

## That's all for part one

That's all we've got time for in part one of this exercise. We've built
ourselves a simple TodoList module that allows us to create, modify, save and
load our todo lists.

In the next installment we'll finish off the application, learning how to use
Anubis to build a command line interface to interact with our Todo Lists. We'll
look at building a command line app with multiple commands, using a runtime
configuration file to automatically tell us where to load and save our todo
lists, and look at command line switches to change that at runtime.
