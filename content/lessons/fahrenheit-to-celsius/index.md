---
title: "Fahrenheit to Celsius table"
date: 2022-05-13
---

K&R Exercise **1-3**: print a Fahrenheit–Celsius conversion table, then put a heading above the columns so a reader can tell which number is which.

## The conversion

The two common temperature scales are related by:

**℃ = (5 / 9) (℉ − 32)**

Walk Fahrenheit from **0** to **300** in steps of **20**, print the Celsius value beside each, and label the columns. Without a heading the output is just two numbers side by side — fine while you wrote it, opaque if you come back later.

## Use floating-point constants

In C, `5 / 9` is integer division, so it becomes `0` and every Celsius value prints as zero. Write `5.0 / 9.0` (and `32.0`) so the conversion actually runs.

## Write the program

Create a file called `fahr-to-celsius.c`:

```c
#include <stdio.h>

int main(void)
{
    float fahr, celsius;
    int lower, step, upper;

    lower = 0;
    step = 20;
    upper = 300;

    printf("Fahrenheit\tCelsius\n");

    fahr = lower;
    while (fahr <= upper) {
        celsius = (5.0 / 9.0) * (fahr - 32.0);
        printf("%3.0f\t%6.1f\n", fahr, celsius);
        fahr = fahr + step;
    }

    return 0;
}
```

The heading is one extra `printf` before the loop. `%3.0f` prints Fahrenheit as a whole number; `%6.1f` gives Celsius one decimal place. The tabs keep the numbers under the words.

## Compile and run

In Terminal, from the folder that holds `fahr-to-celsius.c`:

```bash
gcc fahr-to-celsius.c -o fahr-to-celsius
./fahr-to-celsius
```

You should see:

```text
Fahrenheit	Celsius
  0	 -17.8
 20	  -6.7
 40	   4.4
 60	  15.6
 80	  26.7
100	  37.8
120	  48.9
140	  60.0
160	  71.1
180	  82.2
200	  93.3
220	 104.4
240	 115.6
260	 126.7
280	 137.8
300	 148.9
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## Check the heading

The exercise is the heading, not the arithmetic. If the words sit above the columns and `0` °F still comes out around `-17.8`, you are done. Tweak the format widths if a column drifts.

## What you should take away

A table without labels is half a program. `printf` can print words as well as numbers; put the heading on its own line before the loop. Floating-point constants keep `5 / 9` from collapsing to zero.

## Next

→ [Celsius to Fahrenheit table — Exercise 1-4](/lessons/celsius-to-fahrenheit)
