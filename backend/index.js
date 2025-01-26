const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');


dotenv.config(); // Load environment variables

const app = express(); // Initialize the app object
app.use(cors()); // Enable CORS for all origins

const PORT = process.env.PORT || 5001;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'speakx';
const collectionName = 'speakx_questions';

// MongoDB Connection Helper
async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw new Error('Database Connection Error');
    }
}

// Root Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the QuestSearch API!',
        instructions: 'Use /api/questions to search for questions.',
        endpoints: {
            search: '/api/questions?query=<keyword>&page=<page>&limit=<limit>',
            example: '/api/questions?query=math&page=1&limit=10'
        }
    });
});

// Search API
app.get('/api/questions', async (req, res) => {
    const { query = '', page = 1, limit = 20 } = req.query;

    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const searchQuery = query ? { title: new RegExp(query, 'i') } : {}; // Case-insensitive regex search
        const options = {
            projection: { _id: 1, title: 1, type: 1, solution: 1 },
            skip: (page - 1) * parseInt(limit, 20),
            limit: parseInt(limit, 20),
        };

        const documents = await collection.find(searchQuery, options).toArray();
        const total = await collection.countDocuments(searchQuery);

        res.json({
            questions: documents,
            total,
            page: parseInt(page, 20),
            limit: parseInt(limit, 20),
        });

        await client.close();
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch a specific question by ID
app.get('/api/questions/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Convert the string ID to an ObjectId
        const objectId = new ObjectId(id);

        // Fetch the question by ID
        const question = await collection.findOne({ _id: objectId });

        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }

        await client.close();
    } catch (err) {
        console.error('Error fetching question details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
