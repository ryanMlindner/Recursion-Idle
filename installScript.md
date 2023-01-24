# Steps to spin up a dev environment

# get into a virtual environment
pip install virtualenv

py -m venv env
env/Scripts/activate.bat
# install required libraries
pip install Flask pymongo python-dotenv Jinja2 Flask_RESTful

# run server host
py main.py

# connect on address
localhost:5000
