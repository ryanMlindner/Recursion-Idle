# Recursion-Idle

A repository of code to accomplish several things:

  -run an idle game
  
  -showcase some important aspects of software design and best practices for use in
resumes

  -coding is puzzles, and I like puzzles.

# DEMO

A demo of the game is available on https://ryanmlindner.github.io/Recursion-Idle/, without ANY API functionality, based on the restrictions
of github pages. See below for more resources.

Due to security issues, the main branch of the game will not work without a superuser connection string. The branch 'demoForLoading', however,
is ready for playtesting and showcases all the aspects of the game, while only allowing read access to the database. Follow the instructions in the
InstallScript.md file for directions on how to run the program after cloning the branch 'demoForLoading'.

# Reference for different aspects

If, given the option, someone wants to look at this for certain coding practices but does not
want to read every single file, please refer to the following:

-python connection to database: dependencies.databaseconnection and dependencies.fileaccess

-python connection to javascript and vice versa: gameengine/static/databaseConnection/ and main.py
flask app API endpoints

-game mechanics and run function: run.js (and most other js files in static for different drivers) grow() 
function

-readability is okay, not where i want it to be, but the project is always changing so that
will improve over time

-project shows all the code i have ever written in javascript and html, but there is another repo
under my name for more python (technical/algorithmic) code WIP

-MVP: idle game, API endpoints/security, databasing with mongoDB, OOP style file structure, 
single authored full dev stack from server to UI (if very very small)
