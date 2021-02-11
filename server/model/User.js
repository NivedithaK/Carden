import mongoose from 'mongoose';
import crypto from 'crypto';
import uniqueValidator from 'mongoose-unique-validator';


var UserSchema = new mongoose.Schema({
    sessionId: String,
    username: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true,
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type:String,
        retuired: true,
    },
    following: {
        type: Array,
        default: [],
    },
    templates: {
        type: Array,
        default: [],
    },
    starredTemplates: {
        type: Array,
        default: [],
    },
    scoring: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestampes: true});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

mongoose.model('User', UserSchema);