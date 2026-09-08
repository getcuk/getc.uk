---
title: "Make escapes visible"
date: 2025-02-15
---

K&R Exercise **1-10**: write a program that copies input to output, but makes three characters obvious: a tab prints as `\t`, a backspace as `\b`, and a backslash as `\\`. Those characters become visible; a real backslash cannot be mistaken for an escape.

You already copied input in [Collapse runs of blanks](/lessons/collapse-blanks). Same `getchar` loop; this time three characters print as two-character escapes instead of themselves.

## Why these three

A tab is `'\t'`. On the screen it just makes a gap. A backspace is `'\b'`. You rarely see it; it moves the cursor back. A backslash is `'\\'`. If you copy it unchanged, then a following `t` looks exactly like a tab you had made visible.

So the program prints `\t` for a tab, `\b` for a backspace, and `\\` for a backslash. Everything else is copied as-is.

## Write the program

Create a file called `make-escapes-visible.c`:

```c
#include <stdio.h>

int main(void)
{
    int c;

    while ((c = getchar()) != EOF) {
        if (c == '\t') {
            printf("\\t");
        } else if (c == '\b') {
            printf("\\b");
        } else if (c == '\\') {
            printf("\\\\");
        } else {
            putchar(c);
        }
    }
    return 0;
}
```

`printf("\\t")` prints a backslash and a `t` — two characters, not a tab. Same idea for `\b` and `\\`.

## Compile and run

In Terminal, from the folder that holds `make-escapes-visible.c`:

```bash
gcc make-escapes-visible.c -o make-escapes-visible
./make-escapes-visible
```

Type `hello`, press **Tab**, type `world`, type a backslash, type `path`, press Return, then **Ctrl+D** on an empty line. You should see:

```text
hello\tworld\\path
```

The tab became `\t`. The single backslash became `\\`.

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## Testing backspace

The Backspace key on macOS usually deletes the last character. It does not send `'\b'` into your program. Feed a real backspace byte with `printf` instead:

```bash
printf 'ab\bc\n' | ./make-escapes-visible
```

You should see:

```text
ab\bc
```

That is `a`, `b`, a backspace, `c`, then a newline. The program prints `\b` for the backspace. In some terminals **Ctrl+H** also sends ASCII 8 — the same byte.

## What you should take away

A copy loop can rewrite characters, not only pass them through. `\t`, `\b`, and `\\` in the output are ordinary letters with a backslash in front — that is what makes tabs, backspaces, and backslashes unambiguous.

## Next

→ [Test the word count program — Exercise 1-11](/lessons/test-word-count)
