---
title: "Convert Celsius to Fahrenheit using c code"
date: 2022-05-13
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "Celsius-to-Fahrenheit-960x590-1.jpg"
---

Q. Write a program to print the corresponding Celsius to Fahrenheit table. Exercise 1-4 (The C Programming Language Textbook)

* * *

As society became industrialised, precise calculations were required. They were done manually before computers took over the task. Following equation converts Celsius to Fahrenheit.

**℉ = (9 / 5) × ℃ + 32**

I have also written a post with program that converts [Fahrenheit to Celsius](/lessons/fahrenheit-to-celsius-in-c). We are going to plug in following values of Celsius to get the corresponding values of Fahrenheit.

| Celsius | Fahrenheit |
| --- | --- |
| \-17 | 0 |
| \-6 | 20 |
| 4 | 40 |
| 15 | 60 |
| 26 | 80 |
| 37 | 100 |
| 48 | 120 |
| 60 | 140 |
| 71 | 160 |
| 82 | 180 |
| 93 | 200 |
| 104 | 220 |
| 115 | 240 |
| 126 | 260 |
| 137 | 280 |
| 148 | 300 |

* * *

> C program that prints Celsius to Fahrenheit getting values from above table

* * *


*`celsius-to-fahrenheit.c`*

```c
#include <stdio.h>

int main(void)
{
  float celsius, fahr;
  float lower, step, upper;
  
  lower = -17.8;
  step = 11.11;
  upper = 148.9;
  
  printf("Celsius\tFahrenheit\n");
  celsius = lower;

  while (celsius <= upper)
  {
    fahr = (9.0 / 5.0) * celsius + 32.0;
    printf("%6.1f %8.0f\n", celsius, fahr);
    celsius += step;  
  }
  return 0;
}
```


gcc celsius-to-fahrenheit.c -o celsius-to-fahrenheit

./celsius-to-fahrenheit

Celsius Fahrenheit  
\-17.8 -0  
\-6.7 20  
4.4 40  
15.5 60  
26.6 80  
37.8 100  
48.9 120  
60.0 140  
71.1 160  
82.2 180  
93.3 200  
104.4 220  
115.5 240  
126.6 260  
137.7 280  
148.9 300
