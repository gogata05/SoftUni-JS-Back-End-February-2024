//DB models: pp,db
//require,minLength,maxLength,

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const userSchema = new mongoose.Schema({
    //copy entity user shape here:
    // •	Description of skills - string (required), - max 40
    // •	myAds - a collection of Ads (a reference to the Ad Model)
    // •	Email - string (required),
    // •	Password - string (required), - 5
    
    myAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Items',//?
        }
    ],
    description: {//!
        type: String,
        require: true,
        minLength: 3,//!
    },
    email: {
        type: String,
        require: true,
        minLength: 10,//!
        // match: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    },
    password: {
        type: String,
        require: true,
        minLength: 4,//!
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