//DB models: pp,db
//require,minLength,maxLength,

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const userSchema = new mongoose.Schema({
    //copy entity user shape here:
    //username - 4
    //email - 10
    //password - 3

    username: {//!
        type: String,
        require: true,
        minLength: 4,//!
    },
    email: {
        type: String,
        require: true,
        minLength: 10,//!
    },
    password: {
        type: String,
        require: true,
        minLength: 3,//!
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