import mongoose from 'mongoose';
const model = mongoose.model;

var SceneSchema = new mongoose.Schema
({
    entities: {
        type:Array,
        default: [],
    },
    num: {
        type: Number,
        default: 0,
    },
});

const Scene = mongoose.model('Scene', SceneSchema);
export default Scene;