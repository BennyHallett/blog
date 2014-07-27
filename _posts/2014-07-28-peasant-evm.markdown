---
layout: post
title:  "Peasant evm (Elixir Version Manager)"
date:   2014-07-28 08:16:00
---

When starting out with Elixir I wanted a way to be able to switch versions easily, without uninstalling a previously installed version. Since Elixir changes frequently, and given it's young age and that it's coming up on a stable 1.0 version, it's not out of the question that some changes will be breaking changes. I've had this come up recently, where one library I was using required the 0.14.3 version of Elixir, but another library hadn't yet been made 0.14.3 compatible, so I had to quickly roll back to 0.14.2.

Having experience using [rvm](http://rvm.io) and [capistrano](http://github.com/capistrano/capistrano) in several of my Ruby projects, I was inspired by some of the techniques they use for switching versions, and [peasant-evm](https://github.com/BennyHallett/peasant-evm) was born.

Basically I've just got my elixir installs in a directory, each under their own version number, and a `current` symlink which points to the one I want to use.

    /opt/elixir/0.14.1
    /opt/elixir/0.14.2
    /opt/elixir/0.14.3
    /opt/elixir/current -> /opt/elixir/0.14.3

On top of this, I've got `/opt/elixir/current/bin` in my path, so that I'm always using whichever one `current` is pointing to, and a shell script that allows me to quickly switch between versions.

    #! /bin/bash
    rm /opt/elixir/current
    ln -s /opt/elixir/$1 /opt/elixir/current

As the name suggests, it's pretty simple at the moment. It might be fun to expand on this further, creating a tool that installs Erlang and different versions of Elixir in much the way that rvm does. The code can be found [here](https://github.com/BennyHallett/peasant-evm).
