---
title: "Installing the CS50 library"
date: 2019-07-17
coverImage: "cs50-library-handdrawn.webp"
---

Harvard’s [CS50](https://cs50.harvard.edu/) course gives you friendly helpers like `get_string()`. Those live in `cs50.h` — and that header is **not** on a stock Mac until you install the library yourself.

If Clang is not on this machine yet, start with [Getting your macOS ready for C](/lessons/macos-ready-for-c).

Here is a tiny program that asks for a name and greets you:

*`cs50-greeting.c`*

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
  string name = get_string("Please enter your name here: ");
  printf("hello, %s!!\n", name);
  return 0;
}
```

Without the library, the compiler fails hard — `cs50.h` file not found:

https://www.youtube.com/watch?v=JwfASDJMaiE&t=3s

## Install from source

Official steps from [cs50/libcs50](https://github.com/cs50/libcs50):

1. Download the latest release from [GitHub Releases](https://github.com/cs50/libcs50/releases).
2. Extract the archive and `cd` into the folder.
3. Run `sudo make install` (installs under `/usr/local` by default).

On older macOS I hit a build snag; the fix that worked for me is in [this libcs50 issue comment](https://github.com/cs50/libcs50/issues/142#issuecomment-435617306). Rough flow:

*`cs50-pseudocode-step1.c`*

```c
// go to github.com 
   // search for cs50 library on the site 
// go to cs50/libcs50 webpage there 
   // download the latest released source code 
// extract the source code folder 
// go into the source code directory using Terminal 
// run "sudo make install" command there 
   // it will ask for your macOS password 
// if everything is correct; cs50 library will get installed 

// in macOS Mojave that I have; we have to make changes in the Makefile 
   // I got error (cp: build/lib/libcs50.dylib: No such file or directory) 
   // see video below to see the changes made to Makefile 
// re-run the "sudo make install" command
```

https://www.youtube.com/watch?v=ZEyf2TumqXc

## What you get

After a successful install you should see:

- `cs50.h` in `/usr/local/include`
- `libcs50.dylib` (and a versioned sibling) in `/usr/local/lib`

Compile with Clang and link the library:

```bash
clang -lcs50 program.c
```

*`cs50-pseudocode-step2.c`*

```c
// navigate to /usr/local/include to see 'cs50.h' file 
// navigate to /usr/local/lib to see 'libcs50-9.0.1.dylib' and 'libcs50.dylib' files
// find out that 'libcs50.dylib' is a symbolic link pointing to 'libcs50-9.dylib' which does not seem to exist 
// go to the folder with source code file requiring cs50.h header file included
   // we enter the command 'clang -lcs50 program-to-be-compiled.c' as described on github page 
// get error 'ld: library not found for -lcs50' and 'clang: error: linker command failed with exit code 1 (use -v to see invocation)'
```

https://www.youtube.com/watch?v=Jho1c2JjvRY&t=1s

## Tell Clang where to look

On a Mac, Clang often still cannot find the header or `-lcs50` until your shell knows `/usr/local`. Add these to `~/.zshrc` (or `~/.bash_profile` if you still use bash):

```bash
export C_INCLUDE_PATH=/usr/local/include
export LIBRARY_PATH=/usr/local/lib
```

Then open a **new** Terminal window. That matches the troubleshooting notes in the [libcs50 README](https://github.com/cs50/libcs50#troubleshooting) and [this issue thread](https://github.com/cs50/libcs50/issues/158#issuecomment-487334092).

*`cs50-pseudocode-step3.c`*

```c
// go to /usr/local/lib directory in Terminal 
// list the contents of lib/ directory 
   // notice that 'libcs50.dylib' file is pointing to 'libcs50-9.dylib' file (this file does not exist) 
// change the symbolic link so that 'libcs50.dylib' points to 'libcs50-9.0.1.dylib' 
   // type 'sudo ln -sf libcs50-9.0.1.dylib /usr/local/lib/libcs50.dylib' command and press enter 
   // enter macOS password 
// check by listing the contents of lib/ directory if the symbolic link has changed
// go to the directory where the source code file requiring cs50 library is saved 
// run 'clang -lcs50 program-to-be-compiled.c' command 
   // if the syntax is correct; it will create 'a.out' file 
// run './a.out' command to see the output
```

https://www.youtube.com/watch?v=W0ZZy6Zq_0w

## Optional: a Makefile

If you prefer `make` over typing `-lcs50` every time, drop a `Makefile` next to your `.c` file:

*`makefile.sh`*

```bash
LDLIBS += -lcs50
CC := clang
CFLAGS += -Wall -Wextra -Werror -pedantic -std=c11
```

Credit: [this Stack Overflow answer](https://stackoverflow.com/questions/55107463/how-to-build-cs50-programs-with-make/55107800#55107800). Walkthrough:

https://www.youtube.com/watch?v=g-WszL6z96E

Without `make`, the one-liner still works:

*`cs50-clang-without-make.sh`*

```bash
clang program_to_be_compiled_using_cs50.c -lcs50 -o any_name_you_want_to_give
```

## Next step

Library in place. Time for the classic first program:

→ [Hello, world](/lessons/how-to-compile-hello-world-program-in-c)
