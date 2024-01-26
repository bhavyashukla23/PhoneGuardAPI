## This is a simple REST API for managing user registration, marking numbers as spam, and searching for users by name or phone number.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Frameworks Used](#frameworks-used)
- [License](#license)

## Prerequisites
- Node.js and npm installed
- MySQL installed

## Installation

1. Install dependencies:

    ```bash
    npm install express sequelize mysql2 body-parser nodemon
    npm install
    ```

2. Set up MySQL database(I am attaching the database i created while testing on my end you can import it directly):
    - Create a MySQL database named `caller` (or your preferred name).
    - Update the database configuration in `app.js` with your MySQL credentials.

4. Run the application:

    ```bash
    nodemon app.js 
    ```

## Usage
The application will be running at `http://localhost:3000`.

## API Endpoints
- **Register a User:**
  - Endpoint: `POST /register`
  - Request Body:
    ```json
    {
      "name": "yinkhmka",
      "phone_number": "99c0kjk99",
      "email": "jijis@ebhuuhoihbe.com",
      "password" :"aaaaaadaaa"
    }
    ```
- **Mark a Number as Spam:**
  - Endpoint: `POST /markSpam`
  - Request Body:
    ```json
    {
      "reporter_id": 1,
      "phone_number": "99990"
    }
    ```
- **Search by Name or Phone Number:**
  - Endpoint: `GET /search?query=Jia`

## Testing with Postman
1. Open Postman.
2. Test each endpoint by providing the required data in the request body or parameters.

## Frameworks Used
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize:** A promise-based Node.js ORM for MySQL.
- **Bcrypt:** A library for hashing passwords.

## Please reach out in case of any help.
