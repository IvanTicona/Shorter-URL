# URL Shortener

This project is a URL shortener developed in JavaScript using Node.js, Express, and MongoDB. The application allows you to shorten long URLs by generating unique identifiers and redirects to the original URL when accessing the short link. Additionally, it includes validations, error handling, and abuse protection (rate limiting).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Execution](#execution)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Features

- **URL Shortening:** Generates unique short identifiers for each URL.
- **Redirection:** Properly redirects from the short URL to the original URL.
- **Analytics Management:** Records the number of clicks for each shortened URL.
- **Input Validation:** Ensures that the entered URL is valid and includes the appropriate protocol (`http://` or `https://`).
- **Abuse Protection:** Uses rate limiting to prevent denial-of-service attacks.
- **User Interface:** Main page developed with EJS and custom styling for a professional presentation.
- **Logging:** Implements HTTP request logging with Morgan.

## Technologies Used

- **Node.js:** Runtime environment for executing JavaScript on the server.
- **Express:** Web framework for building server applications.
- **MongoDB:** NoSQL database to store URLs and analytics.
- **Mongoose:** ODM for interacting with MongoDB.
- **nanoid:** Generates unique short identifiers.
- **EJS:** Template engine for generating dynamic views.
- **dotenv:** Manages environment variables.
- **express-rate-limit:** Middleware to limit the number of requests.
- **morgan:** Middleware for logging HTTP requests.
- **validator:** Package to validate URLs.

## Requirements

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (you can use a local instance or a cloud service)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IvanTicona/Shorter-URL.git
   cd Shorter-URL
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file in the project root** with the following content:

   ```env
   MONGO_URI=mongodb://localhost:27017/shorter-url
   PORT=3000
   ```

   Make sure to adjust `MONGO_URI` if you are using a different MongoDB instance.

## Execution

To start the server, you can use Node.js or, in development mode, [Nodemon](https://nodemon.io/) to auto-reload:

- **With Node.js:**

  ```bash
  node index.js
  ```

- **With Nodemon (development mode):**

  ```bash
  nodemon index.js
  ```

When started, you should see messages in the terminal indicating that the database is connected and that the server is running on the defined port (default is 3000).

## Testing

### Testing URL Shortening with Postman

1. **Start the server** and open Postman.
2. **Create a `POST` request:**

   - **URL:** `http://localhost:3000/shorten`
   - **Body (x-www-form-urlencoded):**
     - **Key:** `originalUrl`
     - **Value:** `https://github.com/IvanTicona/Shorter-URL.git` *(Example URL)*

3. **Send the request:**  
   If the URL is valid, you will receive an HTML response displaying the shortened link.

### Testing Redirection

1. From the previous response, copy the generated short identifier (for example, `abcd1234`).
2. **Create a `GET` request:**

   - **URL:** `http://localhost:3000/abcd1234` *(replace the code with the one you obtained)*

3. **Send the request:**  
   The server will redirect to the original URL. You can disable automatic redirection following in Postman to view the `Location` header.

## Project Structure

```plaintext
acortador-url/
├── controllers/
│   └── urlController.js         # Logic for creating and redirecting URLs
├── models/
│   └── Url.js                   # MongoDB schema and model for URLs
├── routes/
│   └── url.js                   # Routes for shortening and redirection
├── views/
│   └── index.ejs                # Main view of the application
├── public/
│   └── css/
│       └── styles.css           # Styles for the interface
├── .env                         # Environment variables
├── index.js                     # Server configuration and DB connection
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```