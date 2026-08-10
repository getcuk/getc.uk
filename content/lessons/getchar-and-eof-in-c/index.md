---
title: "How to read input using getchar() and EOF in c"
date: 2022-05-14
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "verify-your-love-960x1269-1.png"
---

Q. Verify that expression getchar( ) != EOF is 0 or 1.

* * *

How would you verify if someone likes you ? They say it is not easy as black and white or 0 and 1. Luckily; we are dealing with computers and everything can be verified with certainty using some code ingenuity. Following program is quite simple and verifies if next character read by built-in c function called getchar() is either 0 or 1.

<script src="https://gist.github.com/krishanthecoder/247d35758cf89f93cdea53554c0e5da3.js"></script>

gcc getchar-and-eof.c -o getchar-and-eof

./getchar-and-eof

t

Value of expression = 1

./getchar-and-eof

Press CTRL+D to simulate EOF

Value of expression = 0
