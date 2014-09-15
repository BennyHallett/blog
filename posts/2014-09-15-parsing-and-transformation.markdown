---
title: Parsing and Transformation
description: "Exploring @pragdave's approach to Elixir, with parsing and transformation"
---

If you're yet to watch the [talks from ElixirConf](http://www.confreaks.com/events/elixirconf2014), do yourself a favour and go check them out. The one's I've seen so far have been amazing.

The first one that I watched is [Dave Thomas'](http://twitter.com/pragdave) keynote talk [Think Different(ly)](http://www.confreaks.com/videos/4119-elixirconf2014-opening-keynote-think-different). This talk transformed the way I think about programming in Elixir. Dave explains how he tackles a new language by writing a [Markdown](http://daringfireball.net/projects/markdown/) parser, and how he came to understand programming in Elixir as parsing and transformation.

Lets look at a simple example to get us started. Say we have an API, and we want to have our endpoint take an identifier, returning some information about cats. We want to keep it fairly clean, so we only return the information that the caller would expect from this call, rather than all the data that we have related to this identifier.

When we think about this, we have a few things we need to do:

* Receive the input
* Look up the record
* Select only the relevant cat information
* Turn it into JSON
* And send it back to the client

At the core of it, the processed described above is transforming one piece of information, _the identifier_, into another, _the JSON packet_.

We can make use of Elixir's pipeline to make these transformations in an obvious way.

    defmodule My.Api do
      def get_data_about_cats(id) do
        id
        |> load_record
        |> select_cat_info
        |> jsonify
      end
    end

Now lets look in depth at the `select_cat_info` function. Again, this function is taking one form of data and transforming it into another, but we can think of it in terms of parsing. We can assume that the function is passed a list of tuples, each containing an atom and another piece of information.

We want only the information about cats, which are all tagged either `:cat` or `:feline`. We have some additional requirements. Anything tagged `:food` that comes before a `:feline` tag needs to also be included, as does anything tagged `:grooming` that comes after a `:cat` tag.

Doing this in an object oriented language seems like it might be daunting. It obviously involves looping over the array and picking out the values tagged with either `:cat` or `:feline`. The difficult part becomes picking out the preceding or trailing tags based on the rules given. When we see `:food`, we have to keep track of it just incase the next item has a `:feline` tag.

It's the edge cases that make these problems difficult.

When we move to a parsing solution, the edge cases can be clearly described and don't seem out of place at all. We can solve this problem as follows:

    defmodule My.Api do

      def select_cat_info(record), do: _select_cat_info(record, [])

      defp _select_cat_info([], output), do: output

      defp _select_cat_info([{ :food, v1 }, { :feline, v2 } | tail], output),
        do: _select_cat_info(tail, output ++ [{ :food, v1 }, { :feline, v2 }])

      defp _select_cat_info([{ :cat, v1 }, { :grooming, v2 } | tail], output),
        do: _select_cat_info(tail, output ++ [{ :cat, v1 }, { :grooming, v2 }])

      defp _select_cat_info([{ :cat, v } | tail], output),
        do: _select_cat_info(tail, output ++ [{ :cat, v }])

      defp _select_cat_info([{ :feline, v } | tail], output),
        do: _select_cat_info(tail, output ++ [{ :feline, v }])

      defp _select_cat_info([ _ | tail ], output),
        do: _select_cat_info(tail, output)

    end

These function definitions are quite lengthy, and I'm sure that we could clean them up, but the basic idea is there. We've got a list of items, and we're adding them into the output list based upon the 4 given rules. The other functions include the termination case (when the input list is finally empty), and the default case, which ignores the item that matches none of the above rules, and looks again at the tail of the list.

How do we handle error cases?

This technique also makes these error cases quite explicit. Using pattern matching and multiple function definitions, we can be clear about our error cases without polluting our main parsing code with if statements checking for pre-conditions.

    def select_cat_info(nil), do: error("Cannot select cat info from a nil record")
    def select_cat_info(record) do
      ...
    end

    def error(msg), do: raise Error, message: msg

Thinking about code in terms of data transformation and parsing certainly twisted my brain, but once I'd got my head around it, it was surprisingly effective. In the cases I've used the technique, I was able to quickly come to a solution that was obvious, but also obviously correct. I had one test case, and code which performed it's job for all cases, ensuring that every additional test went green straight away. It was an odd, but refreshing, feeling.
