# Steps to spin up a dev environment

# get into a virtual environment
pip install virtualenv

py -m venv env
env/Scripts/activate.bat
# install required libraries
pip install -r requirements.txt

# run server host
py main.py

# connect on address
localhost:5000
