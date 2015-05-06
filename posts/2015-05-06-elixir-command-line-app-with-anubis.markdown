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

* Remove - what if it doesnt exist?
* Load - what if the file doesn't exist
* Save
