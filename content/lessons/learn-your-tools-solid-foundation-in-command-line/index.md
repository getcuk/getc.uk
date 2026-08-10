---
title: "Solid foundation in the use of Command Line tools"
date: 2019-06-11
categories: 
  - "articles"
tags: 
  - "learn-essential-tools"
  - "productivity"
coverImage: "foundation-960x323-v3.png"
---

In the old days of computers; there was not much on the screen to see apart from the text. The old computers were somewhat like typewriters but with a screen where instead of typing and printing directly to the paper; you could type and print to the screen. However; there was an important distinction between typewriters and these computers i.e. you could have conversation with these computers. Wow!! You could type something in a cryptic language that the computer could understand and get an answer or output to your _request_.

**Requests** to the computer ( funnily enough ) were named as **commands** to computer by some naive humans who thought that computers will always obey their commands. We will stick to this terminology ( for consistency purposes - _forgive me AI; not my fault_ ) until Artificial Intelligence ( AI ) becomes conscious of it and clarifies the difference between **request** and **command** to a computer.

Following is the video that shows how you could type **commands** and press enter to get the output in the old computers.

https://www.youtube.com/embed/ANEZX48LgUw

With the evolution in computing and operating systems; computers have moved on from this text based conversation. We now have buttons that we can click with the device called mouse to open up windows like this webpage you are reading in a browser window. I guess you got here by clicking couple of buttons and navigating through windows (_unless you are an AI_). We don't need to type commands anymore to open a file or to create a folder or go inside a folder. Now we have Graphic User Interface (GUI) or Windows. We can just right-click, single or double left click on interface buttons to interact with computer.

This is all well and good but we have lost that _commanding_ control we once had with text based commands or _have we_ ??

The answer lies in programs called Terminal for UNIX based systems like Linux or MacOS and Command Prompt for Windows Operating Systems. These apps do the same thing that we could do in olden days i.e. giving commands to the computer as shown in the video above.

#### Q. Why do we need Terminal or Command Prompt if we have GUIs ?

The answer is simple. i.e. to have granular control. Computer needs to know what specifically you want it to do and we can tell that by typing single _command line_ and _Enter_ afterwards (_Enter_ is _called Return in Terminal_ \- _comes from carriage return in Typewriter_s). If you are a programmer; you need to deal with the computer in granular way and as programming is text based; it becomes essential to have a tool like Terminal or Command Prompt.

Now if you are normal computer user; you might not need to converse with computer using these tools. You have pretty GUIs with buttons and you can perform almost all of your tasks pressing buttons, dragging mouse and typing whenever necessary.

**Note:** Learning the command line is a rewarding experience. The commands that you learn here have survived the test of time (almost 40 years) and are less likely to disappear in next generation of computers even if the computers change drastically.

#### Some terminology

We come across following terms while talking to other programmers so it is a good practice to learn to identify what we are talking about. They will become clearer further down this post when we get some experience writing commands.

###### Console

Console is the whole computer system that deals with input, output and the history of the commands. There is only one console for the system but it can have many terminals.

###### **_Terminal_**

Terminal is a single connection we make to the console. It is the graphical user interface window that can have input and output of the commands.

###### **_Command Prompt_**

A command prompt is the part of command line with arrow, tilde and cursor that exists on the line before we entered any command line.

###### **_Command Line_**

Command line is the actual command that we type in the Terminal to get information or accomplish a task. We will learn below what commands are, what they accomplish and how to use them.

###### Directory

Strictly speaking; directory is an address of a folder. Folder is a GUI physical space for files in operating system. For our purposes; we will use directory and folder interchangeably. In command line lingo; we always call a folder as directory.

###### Shell

Shell is command-line interpreter. It is a program that translates the commands typed in the terminal for the operating system to execute. The most common shell that comes pre-installed on terminals is bash (Bourn Again SHell). Examples of other shell programs are zsh, tcsh, ksh and c shell.

#### Some inherent command line differences between Operating Systems

It is better to learn command line operations on computers that have UNIX like operating system (OS) as it was the first OS to introduce command line and C programming language. Examples of OSs that are based on UNIX Operating System are Linux and MacOS.

I personally chose MacOS for this post as it has excellent GUI but same file system as Linux Operating System. Linux and MacOS have another similarity which is that both follow the [POSIX](https://pubs.opengroup.org/onlinepubs/9699919799.2018edition/) (_Portable Operating System Interface for Unix-like Operating Systems_) standard. This standard makes it possible to compile programs on Linux to be run on MacOS and vice-versa. MacOS comes with Same Bash shell that is also available on many Linux Distributions. There is also availability to install other shell programs as it is on Linux.

However; Microsoft Windows OS has different architecture, file system and the default Shell is cmd.exe. Microsoft is trying to introduce same features as Linux and MacOS. They are in the process of releasing new Terminal for Windows. Watch the video about the new terminal from Microsoft [here](https://www.youtube.com/watch?v=8gw0rXPMMPE).

**Note:** It does not matter what OS you use as long as it has Terminal type app with Shell program like Bash or zsh installed on it. The most important thing is learning the commands rather than debating about Operating System strengths with religious fervor.

#### Starting the Terminal App in MacOS

Terminal App comes with MacOS by default and is available as an Application. It can be launched either from the launchpad or by searching in Spotlight Search. I am using zsh as shell instead of bash but the commands that we learn here are same for all shells. Watch the following video to learn how you can start the Terminal Application in MacOS.

https://www.youtube.com/embed/INY5HvjKhVs

#### Common Commands

From this point forward; we will learn commands that help us to do things using Command line Terminal. It becomes clearer why we need each command when we discuss them in context.

##### File System in MacOS

All UNIX like operating systems have a tree like hierarchical directory ( folder ) structure. Each directory contains other directories or files. Foremost directory in the file system is called the _root directory_. It contains the whole file system itself and is denoted by '/'.

As we are working with MacOS in this post; the file system can be depicted as shown in the following diagram:

<figure>

![](images/macOS_file_system_post-1024x724.jpeg)

<figcaption>

File System Tree in MacOS diagram

</figcaption>

</figure>

**Note:** This diagram is purely drawn for representation purposes. It gives us insight into how the hierarchy is structured. All the folders / directories under _root directory_ are said to have _parent-child relationship_ where root is parent. The diagram does not show all of the directories, files and directories inside them directories and so on.

The same File System Tree drawn above can be accessed in GUI form in finder app as shown below:

<figure>

![](images/macOS-file-system-tree-in-finder-app-1-1024x842.jpg)

<figcaption>

File System Tree in MacOS finder app

</figcaption>

</figure>

Some of the Folders / directories are faded in the finder window above because they are hidden files and are not usually visible in GUI. Hidden files in system start with **.** and file name after it.

We can see the same File System Tree in Terminal as shown below:

<figure>

![](images/terminal-showing-root-contents-1024x645.jpg)

<figcaption>

File System in MacOS Terminal

</figcaption>

</figure>

##### Navigating the File System using Terminal

As we can left-click on folders to go into them and see the contents; we can do the same with Terminal. Three commands that help us in navigation are explained below:

**Remember:** Commands, directory names and file names in Unix like Operating Systems like MacOS are case-sensitive. Learning the command requires you to understand what command does and then committing few of them to memory.

Prerequisite for learning commands:

- Terminal App in Linux, MacOS or similar App in Windows

- Practice time for typing commands in the Terminal

- Patience to work with dry looking material in this post ( once learned; it will become interesting )

**pwd** - print the name of current working directory

The current working directory is the directory where we are currently in. When we first log into the terminal or let's say just start the Terminal app; we are in _home_ _directory_ (represented by '~' tilde symbol). If we are not sure what directory we are in; we can just type **pwd** and press **return** to get the output with the name of the current directory ([full absolute pathname](#pathnames) starting from _root directory_) as shown below:

https://www.youtube.com/embed/xm2v8HzjhTU

**Note:** Each user in UNIX like operating system has their own _home directory_. This is the directory where the user can store personal files, directories and programs.

**ls** - List the contents of the directory

If we want to see the contents of current working directory; we can just type **ls** and press **return**. This command can be used to show the contents of any directory. In the following video; we see the content of our home directory by using this command.

https://www.youtube.com/embed/fBfOKnvI3Ug

We can see the contents of almost any directory on the system from any current working directory if we use absolute path ( Learn more [here](#pathnames) ) of the directory. In the video below; we are listing the contents of _root directory_ and other directories when current working directory is _home directory_.

https://www.youtube.com/embed/IEGzbGIEGq0

We can also use the relative paths with **ls** command. In the video below; we are listing the contents of parent directory using '**. .**' (double dot notation) and then parent's parent directory. However; we can list the contents of directory using '**.**' (single dot notation) only if the folder is subdirectory of the current working directory. (bin/ is not subdirectory of home directory in the following video)

https://www.youtube.com/embed/JTuESKNtJsA

We can also list the contents of two or more directories within the single **ls** command. In the video below; we are listing the contents of _root directory_ and usr/ directory using their absolute paths and Desktop directory using its relative path as I know it is the subdirectory of current working directory.

https://www.youtube.com/embed/fP0XS7Yrepo

We go into detail of using **ls** command in following sections. You can get there by clicking [here.](#options-arguments)

**cd** - Change directory

This command is used to enter into another directory. To execute this command; we type **cd path\_to\_the \_directory** to get into the directory. **cd** command does exactly what double-clicking on the folder does in GUI. We can see that in the following video as I am double-clicking on folders in Finder app and navigating the same folders using Terminal app.

https://www.youtube.com/embed/4uZMdAKZDWM

**Note:** Command prompt is set to display current working directory. You can see it changing when I change directory using **cd** command in above video.

###### Few things about pathnames

Path or Pathname of a directory is the route that we can take to reach that directory. There are two ways to write pathnames as an absolute pathname or relative pathname. In the above video; I have used the relative pathname of the folders as I have made sure if the directory I want to enter is available in current directory.

###### Absolute Pathname

An absolute pathname starts from _root directory '/'_; follows the tree branches of directories to get to the desired directory. In other words; an absolute pathname is full address of the directory with reference to the _root directory_.

When we type **pwd** on command prompt; we get an absolute pathname. If we copy this pathname or write it down; we can get to this pathname from any directory. In the following video; I am using **cd absolute pathname** from _home directory_.

https://www.youtube.com/embed/\_TYyBb69rkY

**Note:** _home directory_ can be accessed just by typing **cd** and pressing **return** from any working directory in the system.

###### Pathname Structure

Each absolute pathname starts with _root directory_ then child-directories next to it. All other directories are represented by directory\_name/ e.g. Desktop/ as explained in the following picture:

<figure>

![](images/absolute-path-explanation-1024x450.jpeg)

<figcaption>

Absolute pathname to funny-app directory

</figcaption>

</figure>

###### Relative Pathname

As we learned above that absolute pathname starts at the _root directory_; similarly relative pathname starts at the current working directory. Relative pathname uses special notation to represent relative positions with reference to current working directory.

The notations are '**.**' (single dot) and '**.** **.**' (two dots). '**.**' represents the current working directory itself and '**. .**' represent parent directory of current working directory.

In the following video; we use absolute pathname to funny-app directory and then use '**.** **.**' double dot notation to go to the parent directory of funny-app directory and then use '**.**' notation to get to the funny-app again.

https://www.youtube.com/embed/Ek4so8R8s0s

**Note:** We almost never use '**.**' single dot notation because it is implied. We are obviously working from the current working directory. Instead we just use **cd** and then name of the folder like cd Desktop rather than cd ./Desktop

**clear** - Clear the screen of terminal window

This command clears the terminal screen when it is full. The shortcut to clear screen in MacOS is ⌘ + K or we can just type **clear** to clear the screen as shown in the video below:

https://www.youtube.com/embed/6BC6Lu6ksMg

##### Options and Arguments to Commands

<figure>

![](images/Scan.jpeg)

<figcaption>

options and arguments for command

</figcaption>

</figure>

**man** - show the manual page on command

The commands can have options and arguments that make that command even more precise. However; it is not always easy to remember what one command does and what option it can have. Therefore, **man** command comes really handy in that scenario. We can just type **man** and then the name of the command and press **return** to read about that command. **man** stands for manual page on the command. **man** pages are available on all UNIX like operating systems by default and can be accessed offline. Though; they are bit cryptic but they are part of the original documentation on UNIX commands.

In the following video; we read the manual page for **ls** command and **man** command itself.

https://www.youtube.com/embed/qDYgz\_scNjc

**Note: man** command uses file terminal pager called **less** command program to read the command pages. **less** shows the first page of the file in the terminal by default. We can press **return** (Enter key) to see next line on the file or **space** key to see next page. We can press **q** key to quit reading the file. We will be learning about **less** program in next section.

**ls** command with options as -l, -a and -la

We can read from the **man** page of **ls** command that it can have options. **\-l** option lists the contents of directory in long format (in great detail). **\- a** option includes the directories whose name begin with **.** (dot) as well means hidden files. We can put both options together as **\-la** which will show all contents in long format. Watch the video below to see the changes between the output using mentioned options.

https://www.youtube.com/embed/hJp8OCyZ9Ic

##### Reading text files

There is a program called **less** that is used to just read the text files. **less** comes under pager programs as it allows us to read long text file page by page and is available on UNIX like operating systems by default. Use **return** key to scroll to next line; **space** key to scroll next page and **q** key to quit **less** program or we can simply scroll with mouse up and down. To know more about the keystrokes of **less**; simply type **h** while in less program. In the following video; I am reading the contents of the\_brook.txt file that contains 'The Brook Poem' using **less**.

https://www.youtube.com/embed/7\_mwDrBAADM

We can try to read files that are not in text format as well. **less** does not show error. It will ask your permission and if you type **y** for yes; it will show you the contents of other format files as shown in the video below:

https://www.youtube.com/embed/rO\_fMCV9tk8

#### Acidic Commands

In this section; we will learn how we can create, copy, rename, move, remove directories and files. I call the commands in this section acidic because if they are executed mindlessly; they can burn your system literally and metaphorically.

**mkdir** - Create a directory or directories

**mkdir** command creates empty directory as we can do by right-click > New Folder in GUI. Let us create a directory called **sandbox** (a testing playground) on Desktop. The following video shows **mkdir** command in action.

https://www.youtube.com/embed/O-SIeVf\_aqw

**A word of caution:** It is best practice to create a sandbox folder to use commands mentioned in this section. As long as you work in sandbox folder; your system is safe-guarded from getting messed-up with your commands. For example; if you go to _root directory_ and start creating, moving and removing directories randomly; the operating system will get messed up and you won't be able to log-in into the computer.

It is even possible to create two or more directories using **mkdir** command. In the following video; we create three directories inside the sandbox directory.

https://www.youtube.com/embed/PU7q5WZwKK8

**touch** \- create an empty file

**touch** command creates an empty file with the given file format. If we do not specify the file format like .c or .jpeg; **touch** command creates .txt file by default. The main purpose of the **touch** command is to change file access and modification times. You can learn more about **touch** using its **man** page. In the following video; we create three files main, main.txt, main.c and main.html and then try opening them.

https://www.youtube.com/embed/RD699DN7utA

**Note:** We used **touch** command just to create empty files and opened them by double-clicking them. Operating System chose the application to open the file on the basis of file extension. In case of just text files; there are shell programs that can do editing as well. Examples of them are [nano](https://www.nano-editor.org/), [emacs](https://www.gnu.org/software/emacs/) and [vim](https://www.vim.org/). We will learn more about editing text files in terminal in future lessons.

**open** - open files and directories

As the name suggests; this command opens files and directories. It takes the help of Operating System to determine what application to use to open the file or directory in question. In the following video; we read **man page** on the **open** command and then open a picture file and sandbox directory with the open command.

https://www.youtube.com/embed/4GVvl9mb-t4

**cp** - copy files and directories

There are different ways to use **cp** command.

**cp _file1 file2_** (when file2 does not exist)

If _file2_ does not exist; **cp** command creates _file2_ and copies the contents of _file1_ into _file2_.In the following video; we create copy of the mountain.jpg in sandbox folder.

https://www.youtube.com/embed/pxgRoAMfC7E

**cp _file1 file2_** (when file2 does exist)

If both _file1_ and _file2_ exist; then **cp** command overwrites the contents of _file2_ silently ( without giving any warning ) with _file1_ as shown in the video below:

https://www.youtube.com/embed/dllbHwxQbt4

**cp _file1 dir/_**

We use above notation when we want to copy _file1_ into a directory as demonstrated below:

https://www.youtube.com/embed/5OkXj5UPXbY

**cp _file1 file2 file3 .. dir/_**

We use above notation when we want to copy multiple files to a directory as shown in the video below:

https://www.youtube.com/embed/AmrqnojEztI

**cp -r _dir\_1/ dir\_2/_** (When dir\_2/ does not exist)

We use above notation to copy directories using **cp** command. **\-r** stands for recursive. It means we can copy directories recursively. As it is the case with files, if _dir\_2_ does not exist; it gets created with the contents of _dir\_1_ as shown in the video below:

https://www.youtube.com/embed/LP74SX1\_y\_g

**cp -r _dir\_1/ dir\_2/_** (When dir\_2/ does exist)

When both directories _dir\_1/_ and _dir\_2/_ exist; then above notation of **cp** command will copy the contents of _dir\_1_/ directory into _dir\_2/_ directory as demonstrated in the video below:

https://www.youtube.com/embed/LgE38zawY8w

**mv** \- move and rename files and directories

**mv** command is quite similar to the **cp** command. It can be used to move file(s) and directories into other directories depending upon how it gets used. All the ways **mv** command can be used is demonstrated below:

**mv _file1 file2_** (When file2 does not exist)

**mv** command renames _file1_ to _file2_ when _file2_ does not exist as shown in the video below:

https://www.youtube.com/embed/85tvY4Qe4-s

**mv _file1 file2_** (When both file1 and file2 exist)

When both _file1_ and _file2_ exist; **mv** command literally moves the contents of _file1_ into _file2_ and therefore overwriting the contents of _file2_ as shown the video below:

https://www.youtube.com/embed/gE8L9eu91Do

**Note:** Above **mv** commands are same for directories as well.

**mv _file1 dir\_1/_**

When **mv** command used in the above notation; it moves _file1_ into _dir\_1_ as shown the video below:

https://www.youtube.com/embed/W8aKM3hmqIM

**mv _file1 file2 dir\_1/ dir\_2/_**

Using the above notation; we can move multiple files and directories into the last directory in the command as denoted by _dir\_2/._ Watch the video below to see how the command works:

https://www.youtube.com/embed/utus84zDe80

**rm** \- remove files and directories

**rm** command is a useful command to delete one or more files or directories. Its function is same as deleting files or directories in GUI but only difference is that it does not ask twice and files are not easily retrievable once deleted. It can be used in following ways:

**rm _file(s)_**

We see in the following video how **rm** command can be used to delete single file and then multiple files.

https://www.youtube.com/embed/v4Ts-14B0QI

**Note:** I used file names '_important-system-file.txt_' and '_random-file.txt_' in above video just to emphasize the fact that **rm** command does not care whether the files you are deleting are important or not. It's your responsibility as smart power user to make sure that you do not delete the file(s) that you wanted to keep. **rm** command does not send the deleted items to the Trash Folder for later retrieval as I demonstrated in the above video.

**rm -d _directory(ies)_**

**rm** command requires **\-d** option to remove one directory or more. It shows error message if we do not use **\-d** option. Following video is showing the how we use this command:

https://www.youtube.com/embed/jCfqg6qsU8s

If the directory we want to delete is not empty and has some files and directories inside it; we need to use **\-r** option that stands for recursive along with the **\-d** option. Watch video below to see the command in action.

https://www.youtube.com/embed/yENBmB1LWXE

If we remember at least few commands described above; we can get to execute some main functions quite fast as compared to dragging mouse and clicking. It becomes second nature to accomplish tasks productively by using the commands regularly. Remember; if you are not sure what one command does; just type _man command-name_ to read the manual page on the command. Last but not least; use **rm** command carefully.
