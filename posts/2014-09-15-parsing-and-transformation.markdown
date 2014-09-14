---
title: Parsing and Transformation
description: "Exploring @pragdave's approach to Elixir, with parsing and transformation"
---

If you're yet to watch the [talks from ElixirConf](), do yourself a favour and go check them out. The one's I've seen so far have been amazing.

The first one that I watched, is [Dave Thomas's](http://twitter.com/pragdave) keynote talk [Think Different(ly)](). This talk transformed the way I think about programming in Elixir. In this talk, Dave explains how he tackles a new language by writing a [Markdown]() parser, and how he came to understand programming in Elixir as parsing and transformation.

If OO programming is about modelling and state manipulation, then functional programming is about data transformation. [Tweet this]().

Lets look at a simple example to get us started. Say we have an API, and we want to have our endpoint take an identifier, and return some information about cats related to that id. We want to keep it fairly clean, so we only return the information that the caller would expect from this call, rather than all the data that we have related to this identifier.

When we think about this, we have a few things we need to do:

* Receive the input
* Look up the record
* Select only the relevant cat information
* Turn it into JSON
* And send it back to the client

At the core of it, the processed described above is transforming one piece of information, _the identifier_, into another _the JSON packet_.

We can make use of Elixir's pipeline to make these transformations in an obvious way.

    defmodule My.Api do

      def get_data_about_cats(id) do
        id
        |> load_record
        |> select_cat_information
        |> jsonify
      end

    end


