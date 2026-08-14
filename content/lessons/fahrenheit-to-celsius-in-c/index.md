---
title: "Convert Fahrenheit to Celsius using c code"
date: 2022-05-13
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "fahrenheit-to-celsius-960x508-1.jpg"
---

Q. Modify the temperature conversion program to print a heading above the table. Exercise 1-3 (The C Programming Language Textbook)

* * *

Temperature scales have helped immensely in scientific measurement, industry and everyday life. Most common scales have been Fahrenheit and Celsius. Following equation describes the relationship between Fahrenheit and Celsius.

**℃ = (5 / 9) (℉ - 32)**

If we enter the values from 0 ℉ to 300 ℉ with increment of 20 ℉; we get the table shown below.

| Fahrenheit | Celsius |
| --- | --- |
| 0 | \-17 |
| 20 | \-6 |
| 40 | 4 |
| 60 | 15 |
| 80 | 26 |
| 100 | 37 |
| 120 | 48 |
| 140 | 60 |
| 160 | 71 |
| 180 | 82 |
| 200 | 93 |
| 220 | 104 |
| 240 | 115 |
| 260 | 126 |
| 280 | 137 |
| 300 | 148 |

* * *

> C Program that prints Fahrenheit to Celsius getting values from above table with a heading

* * *


*`fahr-to-celsius.c`*

```c
#include <stdio.h>

int main(void)
{
  float fahr, celsius;
  int lower, step, upper;
  
  lower = 0;
  step = 20;
  upper = 300;
  
  /* Add the following line for printing the heading of the table */
  printf("Fahrenheit\tCelsius\n");
  
  fahr = lower;
  
  while (fahr <= upper)
  {
    celsius = (5.0 / 9.0) * (fahr - 32.0);
    printf("%3.0f %18.1f\n", fahr, celsius);
    fahr += step;
  }
  
  return 0;
}
```


gcc fahr-to-celsius.c -o fahr-to-celsius

./fahr-to-celsius

Fahrenheit Celsius  
0 -17.8  
20 -6.7  
40 4.4  
60 15.6  
80 26.7  
100 37.8  
120 48.9  
140 60.0  
160 71.1  
180 82.2  
200 93.3  
220 104.4  
240 115.6  
260 126.7  
280 137.8  
300 148.9
