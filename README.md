library-management-app
======================

This guide provides step-by-step instructions to set up and run the `library-management-app`, including database initialization, environment configuration, and application startup for both backend and frontend.

* * *

**Prerequisites**
-----------------

*   **Node.js** (v14 or higher)
*   **npm** (v6 or higher)
*   **PostgreSQL** (latest version)
*   **Docker** and **Docker Compose** (optional, for containerization)

* * *

**Database Initialization**
---------------------------

### **1\. Create the Database**

Create a new PostgreSQL database named `libraryDb` using the `postgres` user:

    # Access PostgreSQL shell
    psql -U postgres
    
    # In the PostgreSQL shell, run:
    CREATE DATABASE "libraryDb";
    

### **2\. Configure Data Source**

Ensure your data source configuration file (`src/config/data-source.ts`) is updated with the correct database connection settings.

### **3\. Create a `.env` File**

In the root directory of your project, create a `.env` file with the following content:

    TYPEORM_HOST=localhost
    TYPEORM_PORT=5432
    TYPEORM_USERNAME=postgres
    TYPEORM_PASSWORD=YOUR_PASSWORD
    TYPEORM_DATABASE=libraryDb
    CORS_ORIGIN=http://localhost:5173
    PORT=3000
    

**Note:** Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

* * *

**Backend Setup**
-----------------

### **1\. Install Dependencies**

Navigate to your backend project directory and run:

    npm install
    

This will install all necessary packages, including Node.js, Express.js with TypeScript, and TypeORM.

### **2\. Run Database Migrations**

#### **If Migrations Already Exist**

Apply existing migrations to set up the database schema:

    npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/data-source.ts
    

#### **If No Migrations Exist**

Generate an initial migration and then run it:

    # Generate the initial migration
    npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/InitialMigration -d src/config/data-source.ts
    
    # Run the migration
    npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/data-source.ts
    

### **3\. Start the Backend Server**

Start the backend application:

    npm start
    

* * *

**Frontend Setup**
------------------

The frontend is built with React, TypeScript, and Vite.

### **1\. Install Dependencies**

Navigate to your frontend project directory and run:

    npm install
    

### **2\. Start the Frontend Server**

Run the development server:

    npm run dev
    

The application will be accessible at `http://localhost:5173`.

* * *

**Running with Docker (Optional)**
----------------------------------

Alternatively, you can run the entire application using Docker:

    docker-compose up --build
    

This command will build and start the `library-management` container with both PostgreSQL and the backend server running.

* * *

**Additional Notes**
--------------------

*   Ensure the backend server is running before starting the frontend to avoid API connection issues.
*   The backend API runs on `http://localhost:3000` by default.
*   If you encounter any issues with ports, make sure they are not being used by other applications.
*   Adjust the `CORS_ORIGIN` in your `.env` file if your frontend is running on a different port or domain.

* * *