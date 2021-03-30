import mongoose from 'mongoose';
const model = mongoose.model;

var TemplateSchema = new mongoose.Schema({
    postDate: {
        type: Date,
        default: new Date()
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
        default: 0,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    canvasColor: {
        type: Object,
        default: {a: 1, b: 118, g: 118, r: 220},
    },
    canvasHeight: {
        type: Number,
        default: 500,
    },
    canvasWidth: {
        type: Number,
        default: 500,
    }
});

const Template = mongoose.model('Template', TemplateSchema);
export default Template;