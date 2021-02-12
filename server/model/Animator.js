import mongoose from 'mongoose';
const model = mongoose.model;

var AnimatorSchema = new mongoose.Schema
({
    animation: {
        type:String,
        default: "",
    },
});

const Animator = mongoose.model('Animation', AnimatorSchema);
export default Animator;