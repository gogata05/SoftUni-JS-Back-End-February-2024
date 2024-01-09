//DB models: pp,db
//require,minLength,maxLength,

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const userSchema = new mongoose.Schema({
    firstName: {//!
        type: String,
        require: true,
        minLength: 1,//!
    },
    secondName: {//!
        type: String,
        require: true,
        minLength: 1,//!
    },
    email: {
        type: String,
        require: true,
        match: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,//?
    },
    password: {
        type: String,
        require: true,
        minLength: 5,//!
    }
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;