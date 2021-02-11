var mongoose = require('mongoose');

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

mongoose.model('Puzzle', PuzzleSchema);