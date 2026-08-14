---
title: "What happens when we add \c as escape sequence to printf's argument string"
date: 2022-05-13
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "unicorn-960-738.png"
---

Q. Experiment to find out what happens when printf's argument string contains \\c, where c is some random character.

* * *

Well, unicorns do not exist in real life but horses do. C provides escape sequences such as \\n for newline character, \\t for tab, \\b for backspace, \\" for double quote and \\\\ for backslash character and **\\c** escape sequence does not exist so we are going to get error as shown below:


*`escape-sequence-nonexistent.c`*

```c
#include <stdio.h>

int main(void)
{
  printf("hello, world\c");
  return 0;
}
```


gcc escape-sequence-nonexistent.c -o escape-sequence-nonexistent

escape-sequence-nonexistent.c:5:23: warning: unknown escape sequence '\\c' \[-Wunknown-escape-sequence\]  
printf("hello, world\\c");  
^~  
1 warning generated.
