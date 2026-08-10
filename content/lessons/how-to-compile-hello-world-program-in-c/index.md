---
title: "Create hello world program in c"
date: 2022-05-13
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "hello-world-v2.png"
---

Q. Run the "hello, world" program on your system. Experiment with leaving out parts of the program to see what messages you get.

* * *

It is a tradition to write a "hello world" program as the first program when learning a new programming language. Incidentally; it was first introduced in the "The C Programming Language" book by Kernighan and Ritchie with this exercise.

<script src="https://gist.github.com/krishanthecoder/f54837cfbd9b71eade85fac0db74d09b.js"></script>

gcc hello.c -o hello  

./hello

hello, world!

## Experiment with leaving out parts

### Step 1: Leave out standard library

<script src="https://gist.github.com/krishanthecoder/59f746581499e3dd7472244f227474df.js"></script>

gcc no-stdio-library.c -o no-stdio-library

no-stdio-library.c:3:5: error: implicitly declaring library function 'printf' with type 'int (const char \*, …)' \[-Werror,-Wimplicit-function-declaration\]  
printf("hello, world\\n");  
  
no-stdio-library.c:3:5: note: include the header or explicitly provide a declaration for 'printf'  
1 error generated.  

When we compile the program after leaving out stdio.h library; it causes error that says the printf function is not declared yet but has been called.

printf function is a c standard library function that is declared in stdio.h so calling it without including stdio.h causes error.

### Step 2: Leave out \\n escape sequence in printf function

<script src="https://gist.github.com/krishanthecoder/82e92c83f7678f4692d6ccb7cb951113.js"></script>

gcc no-newline-escape-sequence.c -o no-newline-escape-sequence

./no-newline-escape-sequence

hello, world%

### Step 3: Leave out main function

<script src="https://gist.github.com/krishanthecoder/bc9610e807cbea351c1d22ffa8be2690.js"></script>

gcc no-main-function.c -o no-main-function  

no-main-function.c:3:8: error: expected parameter declarator  
printf("hello, world\\n");  
^  
no-main-function.c:3:8: error: expected ')'  
no-main-function.c:3:7: note: to match this '('  
printf("hello, world\\n");  
^  
no-main-function.c:3:1: warning: type specifier missing, defaults to 'int' \[-Wimplicit-int\]  
printf("hello, world\\n");  
^  
no-main-function.c:3:1: error: conflicting types for 'printf'  
/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/stdio.h:175:6: note: previous declaration is here  
int printf(const char \* \_\_restrict, …) \_\_printflike(1, 2);  
^  
1 warning and 3 errors generated.

If you try to compile a program without using main function; the compiler gets confused and throws a number of errors. The main function is entry point that signifies the start and end of the program.

## Step 4: Leave out all lines except printf function

<script src="https://gist.github.com/krishanthecoder/e71c5051180a43df4e7cdfbc96a24dfb.js"></script>

gcc just-printf-function.c -o just-printf-function

just-printf-function.c:1:8: error: expected parameter declarator  
printf("hello, world\\n");  
^  
just-printf-function.c:1:8: error: expected ')'  
just-printf-function.c:1:7: note: to match this '('  
printf("hello, world\\n");  
^  
just-printf-function.c:1:1: warning: type specifier missing, defaults to 'int' \[-Wimplicit-int\]  
printf("hello, world\\n");  
^  
just-printf-function.c:1:1: warning: incompatible redeclaration of library function 'printf' \[-Wincompatible-library-redeclaration\]  
just-printf-function.c:1:1: note: 'printf' is a builtin with type 'int (const char \*, …)'  
2 warnings and 2 errors generated.

We can just type printf function with "hello, world" string as its argument and try to compile it. Again; it is going to display errors as the c program is missing vital elements like c standard library and the main function.

However; it might have worked with Python which is an interpreted language meaning there is no compilation process such as below:

<script src="https://gist.github.com/krishanthecoder/e019719743f5eec6cdae96ea9ae2dbae.js"></script>

python3 hello.py

hello, world!
