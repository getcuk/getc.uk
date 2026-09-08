---
title: "Celsius to Fahrenheit table"
date: 2022-05-13
---

K&R Exercise **1-4**: print the temperature table the other way around — Celsius on the left, Fahrenheit on the right.

You already have [Fahrenheit to Celsius](/lessons/fahrenheit-to-celsius). Same loop, same heading habit, inverted formula.

## The formula

Fahrenheit is **(9 / 5) × ℃ + 32**. Walk Celsius from **0** to **300** in steps of **20**, print Fahrenheit beside each value, and label the columns.

## Use floating-point constants

In C, `9 / 5` is integer division, so it becomes `1`. Then `100` Celsius prints as `132` instead of `212`. Write `9.0 / 5.0` (and `32.0`) so the conversion actually runs.

## Write the program

Create a file called `celsius-to-fahrenheit.c`:

```c
#include <stdio.h>

int main(void)
{
    float fahr, celsius;
    int lower, step, upper;

    lower = 0;
    step = 20;
    upper = 300;

    printf("Celsius\tFahrenheit\n");

    celsius = lower;
    while (celsius <= upper) {
        fahr = (9.0 / 5.0) * celsius + 32.0;
        printf("%7.0f\t%10.0f\n", celsius, fahr);
        celsius = celsius + step;
    }

    return 0;
}
```

The skeleton is the book’s table: `lower`, `upper`, `step`, a `while`. The conversion line is the only real change.

## Compile and run

In Terminal, from the folder that holds `celsius-to-fahrenheit.c`:

```bash
gcc celsius-to-fahrenheit.c -o celsius-to-fahrenheit
./celsius-to-fahrenheit
```

You should see:

```text
Celsius	Fahrenheit
      0	        32
     20	        68
     40	       104
     60	       140
     80	       176
    100	       212
    120	       248
    140	       284
    160	       320
    180	       356
    200	       392
    220	       428
    240	       464
    260	       500
    280	       536
    300	       572
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

## Check the numbers

`0` Celsius is freezing, so Fahrenheit should be `32`. `100` Celsius is boiling, so Fahrenheit should be `212`. If those two are wrong, you probably wrote `9 / 5` without the decimals.

## What you should take away

Inverting a conversion is a formula change, not a new program. The loop, the heading, and the floating-point warning stay the same.

## Next

→ [Reverse temperature table — Exercise 1-5](/lessons/reverse-temperature-table)
