---
title: "Getting your macOS ready for C"
date: 2019-07-16
coverImage: "macos-ready-for-c-seagull.webp"
---

Before any C can fly, the Mac needs a compiler. That sounds heavy. It is not.

I am not installing the full [Xcode](https://developer.apple.com/xcode/) IDE here. For learning C we need a place to type, and a compiler in Terminal. Keep the rest out of the way.

## Keep it simple

KISS — *Keep It Simple, Stupid* — is the whole plan for this page.

You need two tools:

1. An editor to write `.c` files — I use [Sublime Text](https://www.sublimetext.com/); any solid editor is fine.
2. **Clang**, Apple’s compiler, which arrives with the **Command Line Tools** package.

That is enough to compile Hello World on a Mac. Fancy IDEs can wait.

## Install with Terminal

The cleanest path is already on your Mac. Open Terminal and run:

```bash
xcode-select --install
```

A system dialog appears. Choose **Install**, accept the license, and wait — the download is large. When it finishes, Clang and friends live under `/Library/Developer/CommandLineTools`.

You can read more about the switcher with `man xcode-select`.

https://www.youtube.com/watch?v=AwZ_G6-pIVg&t=11s

## Or download from Apple

If the dialog misbehaves, or you want a specific tools version, sign in at [Apple Developer downloads](https://developer.apple.com/download/all/?q=command%20line%20tools), search for **Command Line Tools**, and install the package that matches your macOS.

![Apple Developer site listing Command Line Tools packages](/lessons/macos-ready-for-c/images/apple-developer-command-line-tools.jpg)

*Apple’s downloads list — pick the Command Line Tools package for your system*

You do **not** need the full Xcode app for this course. Clang is one tool among the BSD-style command-line utilities in that package; installing the slim tools package is enough.

## Next step

Compiler on the Mac. Next we add Harvard’s helper library so functions like `get_string()` work locally:

→ [Installing the CS50 library](/lessons/cs50-library)
