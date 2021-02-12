import mongoose from 'mongoose';
const model = mongoose.model;

var PuzzleSchema = new mongoose.Schema
({
    type: {
        type:String,
        default: "",
    },
    entities: {
        type: Array,
        default: [],
    },
});

const Puzzle = mongoose.model('Puzzle', PuzzleSchema);
export default Puzzle;