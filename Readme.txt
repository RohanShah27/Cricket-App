Crickstarit: A web app to display historical cricket data of both men and women matches with visualizations.

Technology Stack:
>NodeJS
>React
>PostgreSQL
>Python For DataScience

Commands to execute after traversing in the directory:

To create the database and essential tables
Copy the yaml files and paste it in yaml-t20-all folder

cd db-init
npm install
node yamlToMongo.js
node mongoToPostgres.js

To Start the server
cd ..
cd server
npm install
npm start

To Start the client
cd ..
cd client
npm install
npm start
 