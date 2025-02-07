import express from 'express';
import { StarRail } from 'starrail.js';
import cors from 'cors';

const app = express();
const client = new StarRail({
    cookie: "your-cookie-here"
});

// Apply middleware
app.use(cors());

// Routes
app.get('/api/characters', async (req, res) => {
    try {
        const chars = await client.getAllCharacters(true);
        console.log('Characters fetched:', chars);
        res.json(chars);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});