# Crickstrait:

A web app for all cricket Lovers.
Here you can view all matches, players, their stats for both men and women.
A search feature to search for both players and teams along with a beautiful home page displaying fixtures, news and recent matches played in selected gender.

## Technology Stack:

#

1. Front End : React JS
2. Middle Tier : NodeJS and Flask
3. Back End : PostgreSQL and MongoDB
4. DataScience and Data Analysis : Python

## Directory Structure:

#

## db-init

**Running these files will take time**

The CSV files images and scripts are present in this folder **db-init**.

        .
        |___db-init
            |__headlines
            :   |__h1.jpg
            |__players
            :   |__player_name.jpg
            |__yaml-t20-all
            :   |__.yaml files
            |__json
            :   |__convertedFile.json
            |__crickstrait_capstone.sql
            |__insertPlayersImage.js
            |__mongoToPostgres.js
            |__yamlToMongo.js
            |__headlines.csv
            |__teamRanking.csv
            |__playerRanking.csv

To create the data base and essential tables execute the following syntax on bash.

**yamlToMongo** file will convert the data from yaml file to mongoDatabase namely crickstrait_db.

**mongoToPostgres** file will convert the documents from mongoDB crickstrait_db to SQL database namely cricket_capstone.

**npm install** will install required node modules and dependencies for the project.

```
cd db-init
npm install
node yamlToMongo.js
node mongoToPostgres.js
node insertPlayersImage.js
```

#

## client

All the actions, components and reducers are present here.

    .
    |___client
        |__node_modules
        |__src
        :   |__actions
        :   |__components
        :   |__reducers
        :   |__styles
        |__package.json

**package-json** contains all the dependencies required for the project.
Execute the commands on bash.

```
cd ..
cd client
npm install
npm start
```

#

## server

### DataScience Libraries setup :

- sklearn
- flask
- flask_sqlalchemy
- plotly.graph_objs
- plotly.express
- chart_studio.plotly
- chart_studio.tools
- pandas
- numpy
- matplotlib.pyplot

1. Now create an account on Plotly chart studio, if you have one already then log in to the account.
2. Now generate the api key from the web site and copy it to your keyboard.
3. Add the credentials in the .ipynb file.
4. You are good to go now start the flask api.

Before starting the server we need to start flask api server

    .
    |__server
        |__node_modules
        |__routes
            |__api
                |__Capstone-Visualization.ipynb

**Use Jupyter Notebook to run the file**.

OR

**To Start flask api exeucte following command on bash.**

```
pip install runipy
runipy Capstone-Visualization.ipynb
```

To Start the server execute the following command on bash

```
cd ..
cd server
npm install
npm start
```

#

View the Application by redirecting to

```
http://localhost:3000/
```
