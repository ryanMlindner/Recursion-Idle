# Recursion-Idle

A repository of code to accomplish several things:

  -run an idle game
  
  -showcase some important aspects of software design and best practices for use in
resumes

  -coding is puzzles, and I like puzzles.

# Reference for different aspects

If, given the option, someone wants to look at this for certain coding practices but does not
want to read every single file, please refer to the following:

-python connection to database: dependencies.databaseconnection and dependencies.fileaccess

-python connection to javascript and vice versa: gameengine.run (for the time being) and main.py
flask app API endpoints

-game mechanics and run function: run.js (and all other js files in static for objects) grow() 
function

-readability is okay, not where i want it to be, but the project is always changing so that
will improve over time

-project shows all the code i have ever written in javascript and html, but there is another repo
under my name for more python (technical/algorithmic) code WIP

-MVP: idle game, API endpoints/security, databasing with mongoDB, OOP style file structure, 
single authored full dev stack from server to UI (if very very small)

# This build will not work. Why?

-The aforementioned coder does not know how to put secrets on github, therefore the mongoDB connection
will not work because you need a connection string which only I have. Good for security,
bad for showing other people the project. WIP
