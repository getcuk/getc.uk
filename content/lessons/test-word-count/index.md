---
title: "Test the word count program"
date: 2025-05-26
---

K&R Exercise **1-11**: say how you would test the word-count program, and which kinds of input are most likely to uncover bugs.

This is a testing exercise, not a new program. You already have [Make escapes visible](/lessons/make-escapes-visible). Same `getchar` loop; this time you compile the word-count listing below and try to break it. You do not need the book.

## What counts as a word

A word here is a run of characters that are **not** a space, a tab, or a newline. That is the whole definition. Punctuation stays glued to the letters. `hello,` is one word. `don't` is one word.

A line is a `'\n'`. A character is every `getchar` that is not `EOF`.

## The program you are testing

Create a file called `wc.c`:

```c
#include <stdio.h>

#define IN 1  /* inside a word */
#define OUT 0 /* outside a word */

int main(void)
{
    int c, nl, nw, nc, state;

    state = OUT;
    nl = nw = nc = 0;
    while ((c = getchar()) != EOF) {
        ++nc;
        if (c == '\n') {
            ++nl;
        }
        if (c == ' ' || c == '\n' || c == '\t') {
            state = OUT;
        } else if (state == OUT) {
            state = IN;
            ++nw;
        }
    }
    printf("%d lines, %d words, %d characters\n", nl, nw, nc);
    return 0;
}
```

`state` starts `OUT`. The first non-whitespace character bumps the word count and flips the state to `IN`. Further letters in that word do nothing to `nw`. The next space, tab, or newline puts you back `OUT`.

Keep `c` as an `int`. [getchar() and EOF](/lessons/getchar-and-eof) already showed why: `getchar` has to return every character *and* `EOF`.

## Compile and run

In Terminal, from the folder that holds `wc.c`:

```bash
gcc wc.c -o wc
./wc
```

Type a line, press Return, then **Ctrl+D** on an empty line. Or pipe a string so the test is exact:

```bash
printf 'hello\n' | ./wc
```

You should see:

```text
1 lines, 1 words, 6 characters
```

Five letters plus the newline. If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## Inputs that hunt for bugs

Decide the expected counts *before* you run each case. The interesting tests sit at the edges: nothing, only whitespace, a missing newline, punctuation, and characters that look like spaces but are not.

### Empty input

```bash
printf '' | ./wc
```

Or run `./wc` and press **Ctrl+D** immediately. You should see:

```text
0 lines, 0 words, 0 characters
```

If this hangs, the `EOF` test is wrong.

### Only newlines

```bash
printf '\n\n\n' | ./wc
```

```text
3 lines, 0 words, 3 characters
```

Three returns, no words. A program that treats “a line” as “anything you typed” would get this wrong.

### Only blanks and tabs

```bash
printf ' \t \t  ' | ./wc
```

```text
0 lines, 0 words, 6 characters
```

Whitespace is not a word. There is no `'\n'`, so the line count stays 0 even though you typed something.

### A word with no newline

```bash
printf 'hello' | ./wc
```

```text
0 lines, 1 words, 5 characters
```

The file has a word and no `'\n'`. Line count is the number of newline characters, not “how many rows of text it felt like.”

### Punctuation glued on

```bash
printf 'hello, world!\n' | ./wc
```

```text
1 lines, 2 words, 14 characters
```

`hello,` and `world!` are two words. The comma and the `!` are not separators. Hyphens and apostrophes behave the same: `don't` and `well-known` are one word each.

That is not a crash. It is the definition. A tester still writes it down, so nobody is surprised later.

### Characters that look like spaces

```bash
printf 'one\rtwo\n' | ./wc
```

```text
1 lines, 1 words, 8 characters
```

`'\r'` (carriage return) is not a space, tab, or newline, so `one` and `two` count as **one** word. Windows line endings (`\r\n`) will inflate the character count and glue words together if a lone `'\r'` appears. Form feed and vertical tab do the same.

## What is most likely to fail

The cases above are the ones that uncover mistakes. Empty input and EOF. Whitespace with no words. A last line that never got a `'\n'`. Punctuation that humans think is a boundary. Characters that look blank on screen but are not `' '`, `'\t'`, or `'\n'`.

A huge file can also overflow `int` counters. You do not need to generate one today — know that `nl`, `nw`, and `nc` will wrap if the file is big enough.

If you stored `getchar` in a `char` instead of an `int`, that is a bug in the program, not in the input. High-bit bytes and `EOF` are what expose it. Keep `int c`.

## What you should take away

The word-count program is only as good as its definition of a word. Test the edges of that definition: empty, whitespace-only, no trailing newline, punctuation, and “space-like” characters it does not treat as separators. Decide the numbers first, then run.

## Next

This is the last of the Chapter 1 walkthroughs on this site so far. [Chapter 1: A Tutorial Introduction](/lessons/kr-chapter-1) lists Exercises **1-1** through **1-11**. The book continues with **1-12**.
