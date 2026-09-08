---
title: "Collapse runs of blanks"
date: 2025-02-14
---

K&R Exercise **1-9**: write a program that reads characters from input and writes them back, squeezing any run of spaces down to a single space.

A blank here is a space character. Tabs stay tabs. Newlines stay newlines.

You already counted spaces in [Count blanks, tabs, and newlines](/lessons/count-blanks). Same read loop; this time you copy, and you squeeze consecutive spaces down to one.

## Remember the last character

The copy loop is the one from the earlier exercises: `while ((c = getchar()) != EOF)`. Each time around, look at `c`. If it is not a space, print it. If it is a space, print it only when the previous character was not a space too.

Keep the previous character in a variable. That is enough to collapse a run. You do not need a nested loop.

## Write the program

Create a file called `collapse-blanks.c`:

```c
#include <stdio.h>

int main(void)
{
    int c;
    int last;

    last = 0;

    while ((c = getchar()) != EOF) {
        if (c != ' ' || last != ' ') {
            putchar(c);
        }
        last = c;
    }

    return 0;
}
```

`last` starts as `0`, which is not a space, so the first character always prints. After that, a space is printed only when the previous character was something else. `putchar` writes one character — the same job as the book's copy program.

## Compile and run

In Terminal, from the folder that holds `collapse-blanks.c`:

```bash
gcc collapse-blanks.c -o collapse-blanks
./collapse-blanks
```

Type this exactly — three spaces between the words, then Return:

```text
hello   world
```

You should see:

```text
hello world
```

One space between the words. Press **Ctrl+D** on an empty line to end.

If you type a line with mixed single and double spaces, every run collapses to one. A tab between words stays a tab — this program only squeezes `' '`.

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## How to send EOF

On macOS, **Ctrl+D** after a newline is end-of-file — same as [getchar() and EOF](/lessons/getchar-and-eof). The program then stops copying and exits.

## Check the output

Type `a  b` (two spaces) and you should get `a b`. Type `a b` (one space) and it should stay `a b`. If extra spaces still appear, `last` is not being compared to `' '`.

## What you should take away

`getchar` still gives you one character at a time. Remembering the last one is enough to collapse a run of blanks. A tab is not a blank.

## Next

→ [Make escapes visible — Exercise 1-10](/lessons/make-escapes-visible)
