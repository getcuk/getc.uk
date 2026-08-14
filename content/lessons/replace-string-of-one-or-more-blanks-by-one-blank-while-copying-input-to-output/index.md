---
title: "How to replace string of one or more blanks by just one blank while copying input to output in c"
date: 2025-02-14
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "method-to-madness-960x669-v1.5.png"
---

Write a program to copy its input to its output, replacing each string of one or more blanks by a single blank.

* * *

One of the most difficult skills to master is discipline to write the program yourself. When a newbie programmer encounters a problem, s/he looks for the solution using Google Search rather than trying to solve the problem old school way i.e. thinking through the different approaches.


*`cp-input-output.c`*

```c
#include <stdio.h>

int main(void)
{
  int c;
  
  while ((c = getchar()) != EOF)
  {
    printf("%c", c);
    
    if (c == ' ')
    {
      while ((c = getchar()) == ' ')
      {
        printf("");
      }

      printf("%c", c);
    }
    
  }
  
  return 0;
}
```


gcc cp-input-output.c -o cp-input-output

./cp-input-output

This sentence has three blanks.

This sentence has three blanks.

Press CTRL+D to simulate EOF and terminate program.

* * *

> _A program should be written similar to how we write an essay. It is very strange how we can come up with something elegant from something completely unrelated._

* * *


![](/lessons/replace-string-of-one-or-more-blanks-by-one-blank-while-copying-input-to-output/images/feeling-of-learning-code.gif)

*Searching for the solution on our beloved Google should be the last resort.*


