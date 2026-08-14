---
title: "Fehrenheit to Celsius using for loop in c"
date: 2022-05-13
categories: 
  - "kr-exercise-solutions"
tags: 
  - "c-programming-language"
  - "textbook-solution"
coverImage: "woman-bus-960x900-1.png"
---

Q. Modify the temperature conversion program to print the table in reverse order, that is for 300 degrees to 0.

* * *

Programming is both an art and science. One problem can be solved in many different ways. What approach one uses comes down to the amount of experience one has with this thing called c programming and problem-solving in general.


*`fahr-celsius-for-loop.c`*

```c
#include <stdio.h>

int main(void)
{
  printf("Fahrenheit \t Celsius\n");
  int fahr = 300;
  
  for (; fahr >= 0; fahr -= 20)
  {
    printf("%6d %16.1f\n", fahr, (5.0 / 9.0) * (fahr - 32));
  }
  return 0;
}
```


Above program does the job but notice; it has magic numbers like 0, 20 and 300 hard-coded in it. It is a bad practice to hard-code numbers in a program. They convey no information to the reader and it is difficult to change them in a systematic way. Numbers always should have meaningful names and declared either as variables or constants as in this instance. Better version of the program is shown below:


*`fahr-to-celsius-for-loop-constants.c`*

```c
#include <stdio.h>

/* It is best practice to define constants rather than throwing random magic numbers around */

#define LOWER   0
#define STEP   20
#define UPPER 300

int main(void)
{
  printf("Fahrenheit \t Celsius\n");

  int fahr = UPPER;
  float celsius;
  
  for (; fahr >= LOWER; fahr -= STEP)
  {
    celsius = (5.0 / 9.0) * (fahr - 32);
    printf("%6d %16.1f\n", fahr, celsius); 
  }
  return 0;
}
```


* * *

> Writing a program is like knitting!  
> You knit a program using loops and various structures in the given language. It comes with practice. A lots of it!

* * *

gcc fahr-celsius-for-loop.c -o fahr-celsius-for-loop

./fahr-celsius-for-loop

Fahrenheit Celsius  
300 148.9  
280 137.8  
260 126.7  
240 115.6  
220 104.4  
200 93.3  
180 82.2  
160 71.1  
140 60.0  
120 48.9  
100 37.8  
80 26.7  
60 15.6  
40 4.4  
20 -6.7  
0 -17.8
