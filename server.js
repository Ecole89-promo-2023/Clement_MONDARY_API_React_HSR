import express, { json } from 'express';
import { StarRail } from 'starrail.js';
import cors from 'cors';

const app = express();

// Initialize StarRail client with proper configuration
const client = new StarRail({ defaultLanguage: 'en' });

// Apply middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/characters', async (req, res) => {
    try {
        const charactersData = await client.getAllCharacters();
        const mappedCharacters = charactersData.map(c => ({
            id: c.id,
            name: c.name.get(),
            imageUrl: `${c.splashImage.url}`,
            path: {
                name: c.path.name.get(),
                icon: c.path.icon.url
            },
            element: {
                name: c.combatType.name.get(),
                icon: c.combatType.icon.url,
            },
        }));
        console.log('Characters data:', mappedCharacters);
        res.json(mappedCharacters);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({
            error: "Failed to fetch characters",
            details: error.message
        });
    }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});