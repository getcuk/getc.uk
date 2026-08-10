---
title: "What is the value of EOF in c"
date: 2022-05-14
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "beauty-no-bg-960-1211-v2.png"
---

Write a program to print the value of EOF.

* * *

Beauty is in the eyes of the beholder. Following program is the most elegant in my view. EOF is a macro / symbolic constant defined in standard c library and its value can differ depending on operating systems. If we want to know its value we can just use printf function like below:

<script src="https://gist.github.com/krishanthecoder/f44890ff82f204a2959fa60ec29b4a6e.js"></script>

gcc eof-value.c -o eof-value

./eof-value

Value of EOF is -1

EOF (end of file) can be represented as an integer even though it is just a macro that replaces EOF with a numerical value.
