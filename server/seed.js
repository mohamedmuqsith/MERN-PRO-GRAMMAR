import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grammar from './models/Grammar.js';

dotenv.config();

// Paste the 'initialData' array from your prompt here.
const initialData = [
    // Tenses
    { category: 'tense', title: "Simple Present", definition: "Used for habits, general truths, repeated actions or unchanging situations...", examples: ["I work in London.", "The sun rises in the east."], notes: "Often used with adverbs of frequency..." },
    { category: 'tense', title: "Present Continuous", definition: "Used for actions happening now or around now...", examples: ["I am studying English now.", "They are playing football..."], notes: "Formed with am/is/are + present participle (-ing form)." },
    // ... (Add all the other data objects provided in the prompt)
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');
        await Grammar.deleteMany({});
        console.log('Cleared existing data.');
        await Grammar.insertMany(initialData);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

seedDatabase();