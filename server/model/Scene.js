var mongoose = require('mongoose');

var SceneSchema = new mongoose.Schema
({
    scenes: {
        type:Array,
        default: [],
    },
    num: {
        type: Number,
        default: 0,
    },
});

mongoose.model('Scene', SceneSchema);