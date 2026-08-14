---
title: "How would you test the word count program ? What kinds of input are most likely to uncover the bugs if there are any ?"
date: 2025-05-26
categories: 
  - "kr-exercise-solutions"
tags: 
  - "textbook-solution"
coverImage: "wc-960px-improved-v3.png"
---

Try testing the program by several inputs and uncover bugs if any. ( K & R Exercise 1-11)

* * *

If you want to prove something is true, you can start by trying to prove counter arguments are false. It is certainly true in programming. Let us get our detective cap on.

Following is our program:

![](/lessons/how-would-you-test-the-word-count-program-what-kinds-of-input-are-most-likely-to-uncover-the-bugs-if-there-are-any/images/wink-385px.gif)


*`wc.c`*

```c
#include <stdio.h>

#define IN 1    /* inside a word */
#define OUT 0   /* outside a word */

/*count the number of lines, words and characters in input*/

int main(void)
{
  /* c stores character from terminal */
  char c;
  
  /* nl stores the number of lines, nw stores the number of words and nc stores the number of characters */
  int nl, nw, nc, state; 
  
  nl = nw = nc = 0;
  state = OUT;
  
  /* getchar is built-in stdio library function that gets next character from terminal. EOF stands for End of File*/
  while ((c = getchar()) != EOF)
  {
    ++nc;
    if (c == '\n')
    {
      ++nl;
    }
    if ( c == ' ' || c == '\n' || c == '\t')
    {
      state = OUT;
    }
    else if (state == OUT)
    {
      state = IN;
      ++nw;
    }
  }
  printf("nl = %d, nw = %d, nc = %d\n", nl, nw, nc);
  return 0;
}
```


I will give it text as input with special characters, blanks, newline character and tabs to test it.

I will try to uncover the bugs by giving it following as inputs:

- Empty string or no input

- No words - just newlines or enter keypresses

- No words - just blanks and tabs

- One or more words with special characters

- Input starting with couple of blanks, tabs and newlines and then one word on each line.

- Very large text

Funnily enough; this word count program passes all of the tests. Don't believe me! You can try it yourself.
