---
title: "Installing CS50 library locally on macOS"
date: 2019-07-17
categories: 
  - "articles"
tags: 
  - "command-line"
  - "cs50"
  - "installation"
coverImage: "cs50-lib-handdrawn-v2.png"
---

If we write a program that requires the use of `get_string()` function for example; we need to include cs50.h header file and it needs to be available locally on your macOS. Example of C code asking for name of the user and then printing it with the greeting `hello, name_of_the_user!!` is shown below:



<!-- gist:krishanthecoder/b6fcefff8478d32138e488045b6b8877 -->



Following video shows how the compiler spits out _fatal error_ when we try to compile above program without installing CS50 Library in macOS:

https://www.youtube.com/watch?v=JwfASDJMaiE&t=3s

**Note:** You might want to check how to install Clang compiler on your macOS. To do that; visit [here](/lessons/getting-your-macos-ready-for-c).

## Steps for installing CS50 Library on macOS

There are four steps in installing and configuring CS50 Library on macOS.

### Step 1

This step involves getting CS50 library from github.com and then installing it using the instructions described on its github page. I had issue with it on macOS Mojave and found its solution from [here](https://github.com/cs50/libcs50/issues/142#issuecomment-435617306). Pseudocode for this step is written below:



<!-- gist:krishanthecoder/a6f423d98e0f2240bc4eb9c7f288be7b -->



See above pseudocode in action in the video below:

https://www.youtube.com/watch?v=ZEyf2TumqXc

* * *

### Step 2

By installing the cs50 library using above steps; we get three files saved on macOS:

- **cs50.h** at `/usr/local/include`

- **libcs50-9.0.1.dylib** at `/usr/local/lib`

- **libcs50.dylib** at `/usr/local/lib`

It is explained on the cs50 github page [here](https://github.com/cs50/libcs50#usage); we can compile the 'C' program that requires cs50.h include file by running the command such as `clang -lcs50 program-to-be-compiled.c`



<!-- gist:krishanthecoder/de4288437b80f680d554533c944b2a29 -->



see how we use above pseudocode in the video below:

https://www.youtube.com/watch?v=Jho1c2JjvRY&t=1s

* * *

### Step 3

We can see in Step 2 above; `clang -lcs50 program-to-be-compiled.c` command gives us error. I found how to fix this issue from [here](https://github.com/cs50/libcs50/issues/158#issuecomment-487334092).

Pseudocode:



<!-- gist:krishanthecoder/5906700d6ac9fcc1834b90169e38cf12 -->



Video showing above pseudocode:

https://www.youtube.com/watch?v=W0ZZy6Zq\_0w

* * *

### Step 4

In this step; we will configure `make` command to be used with `-lcs50` command. It can be done by creating a file called _Makefile_ in the directory where the source code file is saved.

We can add the following code in the _Makefile_ to configure make utility to work with `-lcs50` command.



<!-- gist:krishanthecoder/d1e27942246386bafe662e4937c916ed -->



I found this solution from [here](https://stackoverflow.com/questions/55107463/how-to-build-cs50-programs-with-make/55107800#55107800). See the video below; where I create the _Makefile_ file and then compile the program using `make` command

https://www.youtube.com/watch?v=g-WszL6z96E

Finally; If you do not want to use `make` command; use following command to compile your C program.



<!-- gist:krishanthecoder/e047506287f14725d6ac96ad51ad82fd -->



If you encounter any problems following the steps above or you have a better way to install cs50 library; please feel free to leave your comments below.

* * *
