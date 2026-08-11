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



<!-- gist:krishanthecoder/f3db45535e83c23d24a3571e203c8b6a -->



I will give it text as input with special characters, blanks, newline character and tabs to test it.

I will try to uncover the bugs by giving it following as inputs:

- Empty string or no input

- No words - just newlines or enter keypresses

- No words - just blanks and tabs

- One or more words with special characters

- Input starting with couple of blanks, tabs and newlines and then one word on each line.

- Very large text

Funnily enough; this word count program passes all of the tests. Don't believe me! You can try it yourself.
