---
title: "Solid foundation in the command line"
date: 2019-06-11
coverImage: "command-line-landscape.webp"
---

I used to think the command line was something only grey-bearded sysadmins needed. Then I started learning C properly — and every tutorial assumed I could open a Terminal, find a folder, and type without panic. The mouse suddenly felt like a toy.

Early computers were almost nothing but text: you typed, the machine answered. We still have that conversation. On a Mac it lives in an app called **Terminal**. Clicking through Finder is fine for everyday work; Terminal is how you ask the machine for something precise — compile this file, list every hidden folder, go *there* and nowhere else.

This is **part 1 of 2**. Here we open Terminal, look at how files are arranged, and learn to move around. Part 2 is where we [create and remove things](/lessons/command-line-files) — carefully.

https://www.youtube.com/embed/ANEZX48LgUw

## Why this matters

If you are learning C on this site, Terminal is not optional flavour. It is how you will compile programs, run them, and dig when something breaks. The commands below have survived about forty years of fashion in computing. Learn them once; they stay useful.

Windows folk can follow the same ideas with [Windows Terminal](https://www.youtube.com/watch?v=8gw0rXPMMPE) or WSL. I work on macOS here — same POSIX family as Linux — because that is what I use to teach myself C.

## A few words you will hear

People throw these around in conversation. You do not need to memorise a glossary; you just need to recognise them when they appear.

The **Terminal** is the window. Inside it, a **shell** (on a modern Mac usually `zsh`) reads what you type. The blinking line waiting for you is the **prompt**. What you type before Return is a **command**. Folders are almost always called **directories** in this world.

## Opening Terminal

On macOS, Terminal is already installed. Open it from Launchpad, or hit `⌘ + Space`, type `Terminal`, and press Return. You should land in your home directory — your personal corner of the disk.

https://www.youtube.com/embed/INY5HvjKhVs

## How the disk is organised

Think of the file system as a tree. At the top sits **root**, written `/`. Everything else hangs underneath — applications, users, libraries — in parent and child directories.

![Diagram of the macOS file system tree under the root directory](/lessons/command-line/images/macos-file-system-tree.jpg)

*A simplified map of the macOS tree — not every folder, just the idea*

You have already seen this tree in Finder. Some system folders look faded because they are hidden. In the shell, hidden names simply start with a dot (`.`).

![Finder window showing the macOS file system tree](/lessons/command-line/images/macos-finder-file-system.jpg)

![Terminal listing the contents of the root directory](/lessons/command-line/images/terminal-root-directory.jpg)

*Same place, three views: diagram, Finder, Terminal*

## Walking around

One habit to lock in early: on macOS and Linux, names are **case-sensitive**. `Desktop` and `desktop` are not the same place.

When I am lost, I ask three questions: *Where am I? What is here? How do I go somewhere else?*

### pwd

Prints the **current working directory** — the folder the shell thinks you are standing in. Fresh Terminal sessions usually start at home (`~`).

https://www.youtube.com/embed/xm2v8HzjhTU

### ls

Lists what is in a directory. On its own, it lists *here*:

https://www.youtube.com/embed/fBfOKnvI3Ug

You can point it elsewhere without moving — an absolute path from root:

https://www.youtube.com/embed/IEGzbGIEGq0

Or a relative path: `.` means this directory, `..` means the parent.

https://www.youtube.com/embed/JTuESKNtJsA

You can even list several places in one breath:

https://www.youtube.com/embed/fP0XS7Yrepo

Flags like `-la` are in [part 2](/lessons/command-line-files#ls).

### cd

Change directory — the shell’s double-click. Watch the prompt update if it shows where you are:

https://www.youtube.com/embed/4uZMdAKZDWM

Type `cd` alone and press Return — you are home again, from anywhere on the machine.

### clear

Terminal sessions get noisy. `clear` (or `⌘ + K` on a Mac) wipes the visible scrollback so you can think again.

https://www.youtube.com/embed/6BC6Lu6ksMg

## Addresses: absolute and relative

A **pathname** is simply the route to a place — how you tell the shell *which* Desktop, *which* project folder.

An **absolute** path always starts at `/` and walks the whole tree. When `pwd` prints a path, that is absolute: you can paste it into `cd` from anywhere and arrive.

https://www.youtube.com/embed/_TYyBb69rkY

![Diagram explaining an absolute pathname from root to a project folder](/lessons/command-line/images/absolute-pathname-diagram.jpg)

*Reading an absolute path left to right, from root outward*

A **relative** path starts from where you already are. That is why `..` is so useful — one step toward the parent — and why `./Desktop` is usually just `Desktop` when you are already in the right parent.

https://www.youtube.com/embed/Ek4so8R8s0s

## Next

You can open Terminal, see the tree, and walk it. That is enough to stop feeling lost.

Next we build a little sandbox and practise the commands that *change* things — create, copy, move, delete — without burning the house down.

→ [Command line: files and folders](/lessons/command-line-files)
