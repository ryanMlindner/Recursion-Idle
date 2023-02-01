# Steps to spin up a dev environment

ensure you have a python installation accessible in your current directory (3.x should work)

# get into a virtual environment

to install pip, follow command line instructions for your system from google :)

pip install virtualenv

py -m venv env

on Windows:
env/Scripts/activate.bat

on Linux(bash):
env/bin/activate

# install required libraries

pip install -r requirements.txt

# run server host

py main.py

# connect on address

localhost:5000
