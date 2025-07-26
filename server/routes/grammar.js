import express from 'express';
import Grammar from '../models/Grammar.js';

const router = express.Router();

// GET all grammar content
router.get('/', async (req, res) => {
    try {
        const grammarData = await Grammar.find().sort({ title: 1 });
        res.json(grammarData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve data.', error: err });
    }
});

// POST new grammar content
router.post('/', async (req, res) => {
    const { category, title, definition, examples, notes } = req.body;

    if (!category || !title || !definition) {
        return res.status(400).json({ message: 'Category, title, and definition are required.' });
    }

    const newContent = new Grammar({
        category,
        title,
        definition,
        examples,
        notes
    });

    try {
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (err) {
        res.status(400).json({ message: 'Failed to save new content. Title may already exist.', error: err });
    }
});

export default router;