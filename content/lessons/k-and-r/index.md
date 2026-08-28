---
title: "Why we teach from K&R"
date: 2026-08-15
---

getc.uk is not a random pile of C snippets. The exercises here follow one textbook: *The C Programming Language* by Brian W. Kernighan and Dennis M. Ritchie — Second Edition, ANSI C. People call it **K&R**. Plenty would call it the GOAT — greatest of all. This page is why we teach from that textbook, and why we have not moved on.

## The white C book

C was born at Bell Labs in the early 1970s. Dennis Ritchie designed the language while Unix was being written in it. Brian Kernighan is one of the clearest technical writers computing has produced. Together they wrote a short book that taught the language by using it — not by cataloguing every feature.

The first edition appeared in **1978**. It is the book a generation of programmers actually learned C from. The **Second Edition** followed in **1988**, updated for **ANSI C** (the C89 standard). That is the copy with the big letter C on the cover and the red ANSI C stamp. That is the edition we follow.

It is a thin book on purpose. There is little padding, few cartoons, and no 800-page tour of every library. You read a few pages, you write a small program, you see what the machine does. The exercises on this site keep that rigour, and add a bit of colour — cartoons and jokes around the work just to make everything interesting.

## Why the Second Edition

We use the Second Edition because that is the C you will still meet in compilers, textbooks, and systems code: `int main(void)`, function prototypes, and the standard library as ANSI described it. The first edition is a historical document. The second is still a working tool.

K&R does not try to be a complete reference for modern C17 or C23. It does not need to.

## Why it still matters

AI can write C that compiles. That is not the same as understanding the program.

K&R trains the opposite habit. The exercises are small on purpose. They make you practise input, output, arithmetic, and control flow until those are second nature. When a program misbehaves, you have somewhere to stand — memory, types, the loop you wrote — instead of hoping the next prompt fixes it.

C is still how a lot of the world actually runs: operating systems, compilers, embedded devices, the guts of higher-level languages.

## Why getc.uk uses it

This site exists to teach C thoroughly, one character at a time. We start where the book starts: K&R Chapter 1. Later chapters join this site when those lessons are written.

We do **not** reprint the textbook. A copy is useful if you have one, but you do not need it to follow along. If you have the book, read the prose next to each exercise. If you do not, the lessons here still stand on their own. What we add are worked notes, Terminal and compiler setup, videos where it helps, and a place to run related challenges.

The “Before you write C” guides are the on-ramp: why fundamentals, then the command line, then a Mac that can compile. After that we start where K&R starts: [hello, world](/lessons/hello-world).

## Start with Chapter 1

The homepage cards are those exercises, in order. Start with the first lesson.

→ [Chapter 1: A Tutorial Introduction](/lessons/kr-chapter-1)

→ [Hello, world — Exercise 1-1](/lessons/hello-world)
