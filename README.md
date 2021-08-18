# feedsServer

The application allows user to create an account and save RSS feeds which only the users can view for themselves.

## Installation & Deployment

First, make sure you have node and npm installed on your machine. These instructions assume you are working on aLinux machine.

Navigate to the root directory on a terminal and install the required packages via npm. The root directory is the server comprising the express backend.

    npm install

Run the server on the terminal as folows.

    node server.js

It runs the server on port 5000.

Then, navigate to the '/feeds' directory which is the React app. There, we again install all npm packages as follows:

    npm install

Then you may run the React application as follows in the same directory.

    npm start

Your application is ready to be viewed at [localhost:3000](http://localhost:3000).

## Tech stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The project comprises of a minimal backend written in Node.js under the [Express](https://expressjs.com/) framework.
