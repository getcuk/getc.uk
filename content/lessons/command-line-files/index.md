---
title: "Command line: files and folders"
date: 2019-06-11
coverImage: "command-line-files-ducks.webp"
---

[Part 1](/lessons/command-line) taught you to open Terminal and move around the file tree. This part is about changing what is on the disk — carefully — so you do not damage anything important.

I used to call these **acidic** commands: useful, powerful, and unforgiving if you wave them around the wrong folder.

So before anything else: make a playground. On the Desktop, create a folder called `sandbox` (we will do that with the shell in a moment). Work *only* inside it until these commands feel boring. Do not practise as an experiment under `/`. The operating system will not lecture you politely.

## Options and arguments

Every useful command has options and arguments — little switches that change its behaviour. You will not remember them all. Nobody does.

![Hand sketch of command options and arguments](/lessons/command-line-files/images/command-options-arguments.jpg)

*The shape of a command: name, then options, then what it acts on*

### man

When you forget, ask the machine itself. `man` opens the **manual page** for a command — dry, a bit cryptic, and available offline without hunting the web.

https://www.youtube.com/embed/qDYgz_scNjc

Those pages open in a pager called **less**. Return moves a line, Space a page, `q` quits. Type `h` inside `less` if you want the cheat sheet.

### less

The same tool reads ordinary text files:

https://www.youtube.com/embed/7_mwDrBAADM

I will even attempt non-text files if you insist — useful once, messy often:

https://www.youtube.com/embed/rO_fMCV9tk8

### ls

Back in [part 1](/lessons/command-line#ls), `ls` showed names of the files and folders. Add options and it tells a richer story: `-l` for a long listing, `-a` to include hidden (dot) names, `-la` for both.

https://www.youtube.com/embed/hJp8OCyZ9Ic

## Building the sandbox

I always start a session like this in a throwaway folder.

### mkdir

Makes a directory — the shell’s New Folder.

https://www.youtube.com/embed/O-SIeVf_aqw

You can create several in one go when you are laying out a little project shape:

https://www.youtube.com/embed/PU7q5WZwKK8

### touch

Creates an empty file (or updates the timestamp on one that already exists). Add an extension (`.c`, `.txt`, `.html`) when you care which app macOS offers on open — without one, the system has little to go on.

https://www.youtube.com/embed/RD699DN7utA

### open

On a Mac, `open` hands a file or folder to the default GUI app — handy when you want to peek without leaving the keyboard entirely:

https://www.youtube.com/embed/4GVvl9mb-t4

(Editors that live *inside* the terminal — [nano](https://www.nano-editor.org/), [vim](https://www.vim.org/), [emacs](https://www.gnu.org/software/emacs/) — are a later adventure.)

## Copying

### cp

Duplicates. The exact meaning depends on whether the destination already exists — and whether you are copying a file or a whole directory.

Copy into a **new** name (destination free):

https://www.youtube.com/embed/pxgRoAMfC7E

Copy onto an **existing** file — it overwrites, quietly, with no Finder-style “are you sure?”:

https://www.youtube.com/embed/dllbHwxQbt4

Drop a file into a directory:

https://www.youtube.com/embed/5OkXj5UPXbY

Several files into a directory:

https://www.youtube.com/embed/AmrqnojEztI

Directories need `-r` (recursive). Destination missing → a new folder appears with the contents. Destination already there → the source folds *into* it.

https://www.youtube.com/embed/LP74SX1_y_g

https://www.youtube.com/embed/LgE38zawY8w

## Moving and renaming

### mv

Same source-then-destination pattern as `cp`, but the original does not stay behind. That is how you rename: move `file1` to a name that does not exist yet.

https://www.youtube.com/embed/85tvY4Qe4-s

If both names exist, you overwrite — again, without drama from the shell:

https://www.youtube.com/embed/gE8L9eu91Do

The same ideas apply to directories. Move one or many items into a folder by listing the destination last:

https://www.youtube.com/embed/W8aKM3hmqIM

https://www.youtube.com/embed/utus84zDe80

## Deleting

### rm

The one that earns the “acid” nickname. It removes files for real. There is usually **no Trash**, no Undo, no second chance — even if you named the file `important-system-file.txt`

https://www.youtube.com/embed/v4Ts-14B0QI

Empty directories need `-d`. Directories with contents need recursion as well — and that is where a mistyped path hurts.

https://www.youtube.com/embed/jCfqg6qsU8s

https://www.youtube.com/embed/yENBmB1LWXE

When in doubt, stop. Read `man rm`. Then read it again. The sandbox is there so mistakes stay small.

## Next

You can navigate, build a playground, and tidy up after yourself. That is enough command line to support learning C.

Next we put a compiler on the Mac:

→ [Getting your macOS ready for C](/lessons/macos-ready-for-c)
