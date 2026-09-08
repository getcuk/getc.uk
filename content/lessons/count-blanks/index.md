---
title: "Count blanks, tabs, and newlines"
date: 2025-02-07
---

K&R Exercise **1-8**: write a program that reads input and counts how many blanks, tabs, and newlines it saw.

A blank here is a space character. Tabs and newlines are counted on their own. Letters, digits, and punctuation are ignored.

You already have [getchar() and EOF](/lessons/getchar-and-eof). Same read loop; three counters this time.

## Three characters to watch

A blank is `' '` (the space bar). A tab is `'\t'` (the Tab key). A newline is `'\n'` (Return). The loop is the one from the earlier exercises: `while ((c = getchar()) != EOF)`. Each time around, look at `c` and increment the matching counter.

## Write the program

Create a file called `count-blanks.c`:

```c
#include <stdio.h>

int main(void)
{
    int c;
    int blanks, tabs, newlines;

    blanks = tabs = newlines = 0;

    while ((c = getchar()) != EOF) {
        if (c == ' ') {
            ++blanks;
        } else if (c == '\t') {
            ++tabs;
        } else if (c == '\n') {
            ++newlines;
        }
    }

    printf("%d blanks, %d tabs, %d newlines\n", blanks, tabs, newlines);
    return 0;
}
```

Three integers, all start at zero. `else if` is fine: one character cannot be a space and a tab at once.

## Compile and run

In Terminal, from the folder that holds `count-blanks.c`:

```bash
gcc count-blanks.c -o count-blanks
./count-blanks
```

Type this exactly — on the second line, press Tab between the words, not space:

```text
The quick brown fox jumps over the lazy dog.
one	two	three
```

Press Return after the second line, then **Ctrl+D** on an empty line. You should see:

```text
8 blanks, 2 tabs, 2 newlines
```

The pangram has eight spaces. `one`, `two`, and `three` are separated by two tabs. Each Return is a newline.

If the second line was typed with spaces, those count as blanks and the tab total stays at zero.

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## How to send EOF

On macOS, **Ctrl+D** after a newline is end-of-file — same as [getchar() and EOF](/lessons/getchar-and-eof). The program then prints the three totals and exits.

## Check the numbers

Count the spaces in the pangram by hand: there are eight. If the program prints `8`, `2`, and `2`, the three tests are wired to the right characters.

## What you should take away

`getchar` gives you one character at a time. Comparing it to `' '`, `'\t'`, and `'\n'` is how you classify input. Three counters stay independent — a tab is not a blank.

## Next

→ [Collapse runs of blanks — Exercise 1-9](/lessons/collapse-blanks)
