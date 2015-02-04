---
title: Phoenix on Docker
description: A simple Dockerfile for running a Phoenix app in a Docker container
date: "October 12th, 2014"
---

Today I started playing around with [Docker](http://docker.com), and I have to say that I'm pretty impressed.

Docker is a tool for packaging an application and it's dependencies into a container, which can then be deployed, without changes, to any host that supports containers.

Since I've been doing a lot of [Elixir](http://elixir-lang.org) lately, I wanted to try and get a [Phoenix](https://github.com/phoenixframework/phoenix) application up and running in a container. In the end it wasn't too difficult

## The Dockerfile

The [Dockerfile](https://gist.github.com/BennyHallett/81ac88a788607ad876e4) for our Phoenix app looks like this:

    FROM        trenpixster/elixir:1.0.1
    COPY        . /phoenix_app
    ENV         MIX_ENV prod
    WORKDIR     /phoenix_app
    RUN         mix do deps.get, compile
    EXPOSE      4000
    CMD         ["mix", "phoenix.start"]

This `Dockerfile` should be placed into the root directory of your Phoenix app. The instructions in the file set up our container.

The `FROM` instruction lets Docker know which image it should use as our container's base. In this instance, we're going to use `v1.0.1` of [trenpixster/elixir](https://registry.hub.docker.com/u/trenpixster/elixir/), which [already has the Erlang VM and Elixir 1.0.1](https://github.com/trenpixster/elixir-dockerfile/blob/master/Dockerfile) installed on it. 

The `COPY` instruction copies our app into the container, to the `/phoenix_app` directory. You can rename this to the actual name of your app if you want, but it will work as it is now. If you do change it though, be sure to change the `WORKDIR` line as well.

We use `ENV` to set the `MIX_ENV` environment variable and tell mix that we want to run in the production environment.

`WORKDIR` ensures that every instruction we run for here on in is launched from `/phoenix_app`

We then use `RUN` to call out to mix and download our dependencies, then compile the app.

The `EXPOSE` instruction tells the container to listen on port 4000, the same port that Phoenix runs on.

Finally, we call `CMD`, which is the instruction used to start our app. We use mix to run the `phoenix.start` task, and we're up and running.

## Building the image

Now that we have our specification for our container, we can build it by running:

    $ sudo docker build -t <your_username>/<app_name>

## Kicking off our container

We need to run our image with a couple of switches. `-d` will force docker to detach, and run in the background. `-p` will redirect one of our system's ports to the `4000` port of the container, allowing us to point our browser at the app running in the container.

    $ sudo docker run -p 8088:4000 -d <your_username>/<app_name>

Now you can point your browser at `http://localhost:8088` and you should see the app running inside the container.

## Stopping the container

Since the container is running detached, we need to get docker to stop it for us.

If you run

    $ sudo docker ps

you will see the currently running containers, and their ids. Given the container id, you can stop it with

    $ sudo docker stop <container_id>
