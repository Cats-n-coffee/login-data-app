const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
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