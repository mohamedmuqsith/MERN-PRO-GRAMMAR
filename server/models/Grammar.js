import mongoose from 'mongoose';

const grammarSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['tense', 'part-of-speech', 'be-verb', 'preposition', 'either-neither']
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    definition: {
        type: String,
        required: true
    },
    examples: [String],
    notes: String
});

const Grammar = mongoose.model('Grammar', grammarSchema);
export default Grammar;