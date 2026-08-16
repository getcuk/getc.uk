---
title: "Hello, world"
date: 2022-05-13
---

K&R Exercise **1-1**: run the classic `hello, world` program on your machine, then deliberately leave pieces out and read what the compiler says.

## Write the program

Create a file called `hello.c`:

```c
#include <stdio.h>

int main(void)
{
    printf("hello, world\n");
    return 0;
}
```

That is the smallest honest C program that talks to the outside world: include the standard I/O header, enter at `main`, print a line, leave cleanly.

## Compile and run

In Terminal, from the folder that holds `hello.c`:

```bash
gcc hello.c -o hello
./hello
```

You should see:

```text
hello, world
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## Experiment: leave pieces out

The exercise is not only to print the greeting. Break the program on purpose and watch the compiler (or the output) complain. That is how you learn which pieces are load-bearing.

### Leave out `stdio.h`

```c
int main(void)
{
    printf("hello, world\n");
    return 0;
}
```

```bash
gcc no-stdio.c -o no-stdio
```

Clang will refuse: `printf` is declared in `<stdio.h>`. Without the header, the compiler does not know the function’s type.

### Leave out the newline

```c
#include <stdio.h>

int main(void)
{
    printf("hello, world");
    return 0;
}
```

```bash
gcc no-newline.c -o no-newline
./no-newline
```

The text still appears, but your shell prompt often sticks to the same line — something like `hello, world%`. The `\n` was doing real work.

### Leave out `main`

```c
#include <stdio.h>

printf("hello, world\n");
```

```bash
gcc no-main.c -o no-main
```

A pile of errors follows. C needs an entry point; `main` is where the program starts and ends.

### Only `printf`

```c
printf("hello, world")
```

```bash
gcc just-printf.c -o just-printf
```

Again the compiler objects: no header, no `main`, not even a complete statement. Languages that run line-by-line (like Python’s `print('hello, world')`) hide that ceremony. C does not.

## What you should take away

You can write, compile, and run a tiny C program. You have also seen *why* `#include`, `main`, and `\n` are not decoration — the compiler and the terminal both notice when they are gone.

## Next

→ [Unknown escape sequences — Exercise 1-2](/lessons/unknown-escape-sequence-in-c)
