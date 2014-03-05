Title: delve - an opinionated roguelike library
Date: 2014-03-05 18:42
Category: Gamedev
Tags: gamedev, roguelike, library, delve
Slug: delve
Author: bennyhallett
Summary: The delve library for creating roguelikes, fast!

Delve is an opinionated library for creating roguelikes.

It's heavinly influcenced by libraries such as libtcod and rot.js. Some of the code, such as the dungeon generators and the scheduling system is ported from rot.js to ruby. The rot.js license is included in the source.

Its opinionated because it directs users towards creating games using stack based screens and a component system. 

The hero feature the auto-roguelike, which allows developers to create an '@ walking around the dungeon' roguelike in a single simple command

`delve gamename`
`cd gamename`
`ruby -Ilib bin/gamename`

The list of things included in delve (as of 0.0.6) is:

* Entity system
* Stack based screens
* Rogue dungeon generator
* Noise generator
* Cellular automata generator
