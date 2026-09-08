---
title: "Unknown escape sequences"
date: 2022-05-13
---

K&R Exercise **1-2**: put a backslash pair that is not a real escape — `\c` is the usual first try — inside `printf`, then compile and see what the compiler does.

## Escapes you already know

`printf` strings can include escapes: `\n` for a newline, `\t` for a tab, `\\` for a backslash, `\"` for a quote. [Hello, world](/lessons/hello-world) already used `\n`. The question is what happens when you invent one.

Unicorns do not exist. Neither does `\c`.

## Write the experiment

Create a file called `unknown-escape.c`:

```c
#include <stdio.h>

int main(void)
{
    printf("hello, world\c");
    return 0;
}
```

Same program as hello, world, except the newline is now a `\c`.

## Compile and read the warning

```bash
gcc unknown-escape.c -o unknown-escape
```

Clang does not refuse the file. It warns:

```text
unknown-escape.c:5:25: warning: unknown escape sequence '\c' [-Wunknown-escape-sequence]
    printf("hello, world\c");
                        ^~
1 warning generated.
```

That caret sits under `\c`. This is a warning, not an error — you still get a binary.

## Run it

```bash
./unknown-escape
```

You should see:

```text
hello, worldc
```

The backslash vanished. The `c` stayed. There is no newline, so your shell prompt often sticks to the same line.

The compiler did not invent a new escape. It dropped the `\` and kept the letter.

## Try another letter

Change `\c` to `\q` (or any letter that is not a real escape) and compile again. You should get the same kind of warning and the same kind of output: the letter, no backslash.

Stick to real escapes when you mean them: `\n`, `\t`, `\b`, `\"`, and `\\` are the ones this chapter has used so far.

## What you should take away

An unknown escape is not a secret feature. On Clang and GCC it is a warning, the program still runs, and `\c` becomes a plain `c`. Read the diagnostics — they point at the exact pair.

## Next

→ [Fahrenheit to Celsius table — Exercise 1-3](/lessons/fahrenheit-to-celsius)
