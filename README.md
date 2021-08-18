# feedsServer

The application allows user to create an account and save RSS feeds which only the users can view for themselves.

## Installation & Deployment

First, make sure you have [node](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine. These instructions assume you are working on a Linux machine.

Also, the React frontend uses Google's [Firebase](https://console.firebase.google.com/) as the database to authenticate users and store their RSS sources. So, you need to have an account on Google to create a new project on the firebase console.

While creating a new project, you will run into configuration information for the project. You will use that information to connect the project to our application.

Create an '.env.local' file inside the '/feeds' directory and populate your configuration info from your firebase project as follows:

    REACT_APP_API_KEY=<YOUR_API_KEY>
    REACT_APP_AUTH_DOMAIN=<>YOUR_AUTH_DOMAIN>
    REACT_APP_PROJECT_ID=<YOUR_PROJECT>
    REACT_APP_STORAGE_BUCKET=<YOUR_STORAGE_PROJECT>
    REACT_APP_MESSAGING_SENDER_ID=<YOUR_SENDER_ID>
    REACT_APP_APP_ID=<YOUR_APP_ID>

You also need to enable sign-in by email under 'Authentication > Sign-in method' in your project dashboard so that users can sign-up or log-in using their emails.

Now, we can navigate to the root directory on a terminal and install the required packages via npm. The root directory is the server comprising the express backend.

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The project comprises of a minimal backend written in Node.js under the [Express](https://expressjs.com/) framework. It makes use of [Firebase](https://firebase.google.com/) as the database.
