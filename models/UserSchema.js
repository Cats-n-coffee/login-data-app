const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        minlength: [4, 'Username must be at least 4 characters'],
        maxlength: [12, 'Username must be 12 characters maximum'],
        trim: true,
    },
    email: {
        type: String,
        match: [re, 'Please enter a valid email address matching this format: myemail@email.com'],
        required: [true, 'Please enter an email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [25, 'Password must be 25 characters maximum'],
    }
});

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.statics.checkPassword = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
    
}

const User = mongoose.model('user', UserSchema);

module.exports = User;