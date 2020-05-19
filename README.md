## Stock portfolio Suggestor Application
A Python based Flask application, that is responsible for suggesting the best stock out of selected strategies using a Machine Learning Model. 

## React.js for Frontend

### To run frontend:

Go inside the frontend folder where package.json file resides and run following commands:
##### First set node.js version 16.x
1) npm install
2) npm start

## Python Backend (Using Flask)

### Flask is used for writing REST API's in python

#### <https://www.geeksforgeeks.org/python-build-a-rest-api-using-flask/>

#### https://iexcloud.io/ is being used to get the current stock data.(API_KEY is used to retrieve data)

### To run backend:

Go inside the backend folder and run following commands:
First set python version as 3

To setup basic python environment
1) pip install virtualenv
2) virtual env
3) source env/bin/activate

To run flask server, run following commands:
1) pip install
2) python app.py

If the backend dependencies are not set up properly, then as an alternative, run following commands at the root of backend folder:

### Necessary Python3 packages:

1) sudo pip3 install flask-restful
2) sudo pip3 install -U flask-cors
3) sudo pip3 install -U python-dotenv                <https://pypi.org/project/python-dotenv/>
4) sudo pip3 install -U requests

Note: Python3 is a pre-req for this to run in any system. Check if pip3 is also there.

#### .env file should be there that should contain API KEY from iexcould site. This file should be placed at the root of the backend folder.