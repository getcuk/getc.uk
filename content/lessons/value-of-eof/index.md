---
title: "The value of EOF"
date: 2022-05-14
---

K&R Exercise **1-7**: write a program that prints the value of `EOF`.

[getchar() and EOF](/lessons/getchar-and-eof) showed that `getchar() != EOF` is 0 or 1. This page asks the next question: what number *is* `EOF`?

## EOF is a macro, not a character

`EOF` lives in `<stdio.h>`. It is a negative integer that means “end of file” — not a key you type. The standard does not pin it to one number, but on the machines you will use it is almost always **-1**. Printing it is how you check.

`getchar` returns an `int` so it can hold every character *and* this extra value. That is why the last exercise compared against `EOF` instead of a `char`.

## Write the program

Create a file called `value-of-eof.c`:

```c
#include <stdio.h>

int main(void)
{
    printf("Value of EOF is %d\n", EOF);
    return 0;
}
```

One `printf`. The argument is the macro itself, not a call to `getchar`.

## Compile and run

In Terminal, from the folder that holds `value-of-eof.c`:

```bash
gcc value-of-eof.c -o value-of-eof
./value-of-eof
```

You should see:

```text
Value of EOF is -1
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

A different negative number is still valid — the library picked another value. What matters is that it is negative, so it cannot collide with a real character (0–255).

## Keep the name

Do not replace `EOF` with `-1` in your programs. The macro is the portable name; the number is an implementation detail this exercise lets you peek at.

You still send end-of-file with **Ctrl+D** on macOS. That is a signal to the terminal. This program does not wait for it — it only prints the constant.

## What you should take away

`EOF` is a negative integer from `<stdio.h>`, usually -1. A tiny `printf` is enough to see it. Keep writing `EOF` in code, not a hard-coded number.

## Next

→ [Count blanks, tabs, and newlines — Exercise 1-8](/lessons/count-blanks)
