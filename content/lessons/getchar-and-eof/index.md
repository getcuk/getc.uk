---
title: "getchar() and EOF"
date: 2022-05-14
---

K&R Exercise **1-6**: show that `getchar() != EOF` is only ever **0** or **1**. Type a character and it is 1. Send end-of-file and it is 0.

This is the first character-input exercise. Later programs loop on that same test; here you prove the test itself.

## What the expression means

`getchar()` waits for one character from standard input and returns it as an `int`. `EOF` is a special value from `<stdio.h>` that means “no more input.”

`getchar() != EOF` compares those two. In C, a comparison is an integer: **1** when the character is not end-of-file, **0** when it is. It does not print the letter you typed.

## Write the program

Create a file called `getchar-and-eof.c`:

```c
#include <stdio.h>

int main(void)
{
    printf("Value of expression = %d\n", getchar() != EOF);
    return 0;
}
```

One `printf`. The interesting work is the argument: read a character, compare it to `EOF`, print the 0 or 1.

## Compile and run

In Terminal, from the folder that holds `getchar-and-eof.c`:

```bash
gcc getchar-and-eof.c -o getchar-and-eof
./getchar-and-eof
```

Type a letter (for example `t`) and press Return. You should see:

```text
Value of expression = 1
```

Run it again:

```bash
./getchar-and-eof
```

This time do not type a letter. Press **Ctrl+D** at the start of the line. That is end-of-file on macOS. You should see:

```text
Value of expression = 0
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## How to send EOF

On macOS, **Ctrl+D** with an empty line is EOF. If a character is already waiting, Ctrl+D flushes that line instead — so press it before you type anything.

The program reads one character and exits. That is enough for this exercise. The next lesson prints the numeric value of `EOF` itself.

## What you should take away

A comparison in C is a number. `getchar() != EOF` is 1 for a real character and 0 at end-of-file — the same test a copy loop will use, over and over.

## Next

→ [The value of EOF — Exercise 1-7](/lessons/value-of-eof)
