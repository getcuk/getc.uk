---
title: "Getting your macOS ready for c"
date: 2019-07-16
categories: 
  - "articles"
tags: 
  - "command-line"
  - "installation"
coverImage: "Kiss-1600x240-v1.png"
---

Before we can get our 'C' code to fly; we need to get our macOS machine ready for it.

KISS Principle and how we apply it ?

KISS stands for "Keep It Simple, Stupid". Generally speaking; It is always good to keep things simple. If we apply KISS principle to learning C programming; we find that we just need two programs for our purposes i.e. one program to write C and one to compile it. We will use Sublime Text Editor that can be downloaded from [here](https://www.sublimetext.com/) to write C programs and [Clang Compiler](https://clang.llvm.org/) (that we download and install using instructions below) in Terminal to compile.

## Installing command line tools for macOS

Clang is an open source compiler available to download and install for free for all operating systems and it gets shipped with command line tools for [Xcode](https://developer.apple.com/xcode/) IDE. You can download it from [Apple Developer Website](https://developer.apple.com/) by signing in with your Apple ID and then visiting [https://developer.apple.com/download/more/](https://developer.apple.com/download/more/) and searching for Command Line tools in search option.

You will get search results like following and you can download and install it from there:

![](/lessons/getting-your-macos-ready-for-c/images/apple-command-line-tools-196kb-1024x681.jpg)

## Alternative and better way to install command line tools

There is also another way to install command-line tools using `xcode-select` in Terminal. `xcode-select` comes pre-installed in macOS and we can read more about it using `man xcode-select` command. Following video shows how to install command line tools without Xcode (although Apple has bundled them with Xcode) using Terminal:

https://www.youtube.com/watch?v=AwZ\_G6-pIVg&t=11s

**Note:** I am not installing Xcode above because I do not need full-fledged IDE especially at this point in time (adhering to KISS principle). Clang is one tool out of many BSD (Berkeley Software Distribution) UNIX command line tools. Following the above process(es); all command line tools get downloaded and installed at **/Library/Developer/CommandLineTools/usr/bin** directory in macOS.
