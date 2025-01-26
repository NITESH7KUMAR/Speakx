# To run the frontend

1. **Install dependencies**:
   - Run the following command to install necessary packages:
     ```bash
     npm install
     ```

2. **Install additional packages**:
   - Install `axios` and `react-router-dom` for making API requests and handling routing:
     ```bash
     npm install axios react-router-dom
     ```

3. **Run the development server**:
   - Start the development server:
     ```bash
     npm start
     ```
   - The app will be accessible at `http://localhost:3000`.


# Backend Setup and Usage

## 1. **Required Dependencies**
   - Install the necessary packages:
     ```bash
     npm install express cors mongodb dotenv
     ```

## 2. **Environment Variables**
   - Create a `.env` file in the root directory and add the following:
     ```
     MONGODB_URI=mongodb://localhost:27017
     PORT=5001
     ```
   - Ensure MongoDB is running locally or set up a remote MongoDB URI for `MONGODB_URI`.

## 3. **MongoDB Setup**
   - The database is connected using the `MongoClient` from `mongodb` package.
   - The application uses `speakx` as the database name and `speakx_questions` as the collection name.
   - Replace MongoDB URI in `.env` if using a remote MongoDB server.

## 4. **API Endpoints**


## 6. **Starting the Server**
   - Run the server using:
     ```bash
     node index.js
     ```
   - The API will be available at `http://localhost:5001`.

---

**Note**:
- Ensure MongoDB is running locally or replace the connection string in the `.env` file for remote MongoDB access.

# Download the node_modules 
   - npm install

# MongoDb
   -Upload your speakx_questions in database speakx and collection speakx_question
   -connect your Mongodb
