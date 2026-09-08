---
title: "Reverse temperature table"
date: 2022-05-13
---

K&R Exercise **1-5**: reprint the Fahrenheit–Celsius table from **300** down to **0**, in steps of **20**. A `for` loop is a clean way to count backwards.

## Count backwards

[Fahrenheit to Celsius table](/lessons/fahrenheit-to-celsius) walked the scale up with a `while`. Same conversion, opposite direction: start at 300, stop at 0.

The conversion is still:

**℃ = (5 / 9) (℉ − 32)**

Use `5.0 / 9.0` so C does not integer-divide `5 / 9` to zero.

## Write the program

Create a file called `fahr-celsius-reverse.c`:

```c
#include <stdio.h>

int main(void)
{
    int fahr;

    printf("Fahrenheit\tCelsius\n");

    for (fahr = 300; fahr >= 0; fahr = fahr - 20) {
        printf("%6d\t%6.1f\n", fahr, (5.0 / 9.0) * (fahr - 32));
    }

    return 0;
}
```

The three parts of `for` are: start at 300, keep going while Fahrenheit is at least 0, then subtract 20. The body prints one row.

## Compile and run

In Terminal, from the folder that holds `fahr-celsius-reverse.c`:

```bash
gcc fahr-celsius-reverse.c -o fahr-celsius-reverse
./fahr-celsius-reverse
```

You should see:

```text
Fahrenheit	Celsius
   300	 148.9
   280	 137.8
   260	 126.7
   240	 115.6
   220	 104.4
   200	  93.3
   180	  82.2
   160	  71.1
   140	  60.0
   120	  48.9
   100	  37.8
    80	  26.7
    60	  15.6
    40	   4.4
    20	  -6.7
     0	 -17.8
```

If `gcc` is missing, finish [Getting your macOS ready for C](/lessons/macos-ready-for-c) first.

The first row is 300 °F, not 0. If the table still climbs, the loop is counting the wrong way.

## Name the limits

`0`, `20`, and `300` are easy to mistype if they appear more than once. Give them names with `#define` so the loop reads as upper down to lower by step:

```c
#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define STEP  20

int main(void)
{
    int fahr;

    printf("Fahrenheit\tCelsius\n");

    for (fahr = UPPER; fahr >= LOWER; fahr = fahr - STEP) {
        printf("%6d\t%6.1f\n", fahr, (5.0 / 9.0) * (fahr - 32));
    }

    return 0;
}
```

The output does not change. The limits now live in one place.

## What you should take away

A `for` loop can count down as easily as up — change the start and the test. Named constants keep the table bounds from turning into unexplained numbers in the middle of the code.

## Next

→ [getchar() and EOF — Exercise 1-6](/lessons/getchar-and-eof)
