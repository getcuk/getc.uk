---
title: "How to count blanks, tabs and newlines in c"
date: 2025-02-07
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "count-960x679-no-bg.png"
---

Write a program to count blanks, tabs and newlines.

* * *

Counting something manually takes time and it is error prone. However; computers do not get tired or make mistakes. If your program is written correctly; it will do the job no matter what.

Following program counts blanks, tabs and newlines in a paragraph.


*`count-blanks-tabs-newlines.c`*

```c
#include <stdio.h>

int main(void)
{
  int c;
  int blanks, tabs, newlines;
  
  /* Set all count variables to 0 */
  blanks = tabs = newlines = 0;
  
  while ((c = getchar()) != EOF)
  {
    /* here ' ' represents a blank */
    
    if (c == ' ')
    {
      ++blanks;
    }
    else if (c == '\t')
    {
      ++tabs;
    }
    else if (c == '\n')
    {
      ++newlines;
    }
  }
  
  printf("You have entered %d blanks, %d tabs and %d newlines\n", blanks, tabs, newlines);
  return 0;
}
```


gcc count-blanks-tabs-newlines.c -o count-blanks-tabs-newlines

./count-blanks-tabs-newlines

The quick brown fox jumps over the lazy dog.

Just another line with two tabs.

(Press CTRL + D)

You have entered 11 blanks, 3 tabs and 2 newlines.

* * *

> _Oh my goodness!  
> What are we going to do ? Computers do better job than us at counting. We can only count our blessings._

* * *

![](/lessons/how-to-count-blanks-tabs-and-newlines-in-c/images/count-your-blessings.gif)
