Pinboards is an Engineering System Configuration Management System which utilizes a variety of functions to create, manipulate, and maintain a secured database.

Checkout a demo at http://pinboardz.azurewebsites.net (serverless - slow initial load time)

## Features

- Server: NodeJS and Express powered server
- Client: HTML5 powered with modern practices
- Database: MySQL
- Host: Microsoft Azure Services
- /systemlist allows viewing of a system with active statuses along with the ability to manipulate valve/component status
- /systemhistorydata logs all changes performed on system through it's lifetime
- /systemlookup allows user to search components through the database, excluding visual display
- /newdiagram allows user to implement new system to database. Includes ability to upload a visual display and label valves/components of a system




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:555](http://localhost:555) to view it in the browser.

## Installation

npm install
npm start

## Requirements

- must create config.js file