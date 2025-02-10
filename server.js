import express, { json } from 'express';
import { StarRail } from 'starrail.js';
import cors from 'cors';

// Constants
const PORT = 3005;
const DEFAULT_LANGUAGE = 'en';

const app = express();

const client = new StarRail({ defaultLanguage: DEFAULT_LANGUAGE });

app.use(cors());
app.use(express.json());

// Helper functions
const mapCharacterData = (character) => ({
    id: character.id,
    name: character.name.get(),
    imageUrl: character.splashImage.url,
    path: {
        name: character.path.name.get(),
        icon: character.path.icon.url
    },
    element: {
        name: character.combatType.name.get(),
        icon: character.combatType.icon.url,
    },
});

const getAllCharacters = async (_, res) => {
    try {
        const charactersData = await client.getAllCharacters();
        const mappedCharacters = charactersData.map(mapCharacterData);
        console.log('Characters data:', mappedCharacters);
        res.json(mappedCharacters);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({
            error: "Failed to fetch characters",
            details: error.message
        });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const targetId = req.params.id;
        const charactersData = await client.getAllCharacters();
        const targetData = charactersData.find(c => c.id == targetId);

        if (!targetData) {
            return res.status(404).json({
                error: "Character not found",
                details: `No character with id ${targetId}`
            });
        }

        console.log('Target character:', targetData);
        res.json(mapCharacterData(targetData));
    } catch (error) {
        console.error('Error fetching character:', error);
        res.status(500).json({
            error: "Failed to fetch character",
            details: error.message
        });
    }
};

app.get('/api/characters', getAllCharacters);
app.get('/api/character/:id', getCharacterById);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
