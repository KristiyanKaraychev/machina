# Machina Project

Machina is a web application that combines an React 19 front-end with a Express.js REST API backend, utilizing MongoDB as database. This README provides instructions for setting up and running the project locally.

## Application Features

You can use the application either as a guest or as a logged-in user:

-   **Guest Users**:

    -   Can view public workout routines and comments.
    -   Can register and log in.

-   **Logged-In Users**:
    -   Can access to their Profile page and edit their profile.
    -   Can create workout routines.
    -   Can edit and delete their workout routines.
    -   Can subscribe to workout routines and access the Subscriptions page.
    -   Can comment on every public workout routine and interact with comments via likes.

## Project Structure

The repository contains the following folders:

-   **`client/`**: Contains the React front-end project.
-   **`server/`**: Contains the Express.js REST API server.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/KristiyanKaraychev/machina.git
    cd machina
    ```

2. Install dependencies for both the front-end and the back-end:

    ### For the Angular Front-End:

    ```bash
    cd client
    npm install
    ```

    ### For the REST API Back-End:

    ```bash
    cd ../server
    npm install
    ```

## Running the Project

To start the application, you need to run both the REST API server and the React front-end. Open two terminal windows or tabs and follow these steps:

### 1. Start the REST API Server:

Navigate to the `server` folder and run:

```bash
npm start
```

The server will start and listen for requests on `http://localhost:3000` by default.

### 2. Start the Angular Front-End:

Navigate to the `p-pals` folder and run:

```bash
npm run dev
```

The Angular application will start and be accessible at `http://localhost:5173` by default.

## Folder Details

### `client/`

This folder contains the React front-end application. Use this directory to:

-   Develop and test the user interface.
-   Manage components, services, and other React modules.

### `server/`

This folder contains the Express.js REST API server. Use this directory to:

-   Develop and test API endpoints.
-   Manage database interactions and other back-end logic. Ensure MongoDB is properly connected to handle data storage.
