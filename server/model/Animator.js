import mongoose from 'mongoose';

var AnimatorSchema = new mongoose.Schema
({
    animation: {
        type:String,
        default: "",
    },
});

mongoose.model('Animation', AnimatorSchema);