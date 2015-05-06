---
title: Creating a command line app in Elixir with Anubis
description: Learn how to create a simple command line application using Elixir
and the Anubis framework. We will be creating a simple application to manage our
TODO lists.
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

* New
* Add - what if it already exists?
* Remove - what if it doesnt exist?
* Load - what if the file doesn't exist
* Save
