---
title: "C Program that replaces each tab by \t, each backspace by \b and each backslash by \\ while copying input to output"
date: 2025-02-15
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "girl-960x1068-1.png"
---

Write a program to copy its input to its output, replacing each tab by \\t, backspace by \\b, and each backslash by \\\\. This makes tabs and backspaces visible in an unambiguous way. (K & R Exercise 1-10)

* * *

Well... this program has been quite tricky. Nevertheless; I have managed to solve it. One of the problems is that it is not possible to simulate backspace in terminal input. When you press backspace, the terminal just deletes the last character instead of registering it as \\b character. One workaround is that we use character 'b' for backslash such as below:

<script src="https://gist.github.com/krishanthecoder/548bdfaa55d238f1966b66b00c602658.js"></script>

I got the suggestion from [GitHub Copilot](https://github.com/features/copilot). I asked it if it knows how to simulate backspace character in terminal:

<figure>

![](images/github-copilot-1200x930-1.png)

<figcaption>

Screenshot of GitHub Copilot in Visual Studio Code

</figcaption>

</figure>

Test the input and output:

gcc replace-by-escape-sequence-v2.c -o replace-by-escape-sequence-v2

./replace-by-escape-sequence-v2

The quick brown foxtabjumped over lazy cat\\dog.

The quick \\brown fox\\tjumped over lazy cat\\\\dog.
