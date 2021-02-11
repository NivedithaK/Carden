const { ObjectId } = require('bson');
var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
    postDate: {
        type: Date,
        default: now
    },
    postUser: {
        type: String,
        default: ""
    },
    stars: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ""
    },
    scenes: {
        type: Array,
        default: [],
    },
    numScenes: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: [],
    },
    flags: {
        type: Number,
        default: 0
    },
    hidden: {
        type: Boolean,
        default: false
    },
});

mongoose.model('Template', TemplateSchema);