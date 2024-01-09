//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "buyCrypto" with the actual collection


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
// •	name - String (required), - 2
// •	image: String (required), - http:// or https://.
// •	price: Number (required), - positive number
// •	description: String (required), - 10
// •	method: String (crypto-wallet, credit-card, debit-card, paypal) required,
// •	buyCrypto - a collection of Users (a reference to the User model)
// •	owner - object Id (a reference to the User model)
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    method: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyCrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
});//?

itemsSchema.method('getLikes', function () {
    return this.buyCrypto.map(x => x._id);//!
})
itemsSchema.method('getUsernames', function () {
    return this.buyCrypto.map(x => x.username);//!
})
itemsSchema.method('getEmails', function () {
    return this.buyCrypto.map(x => x.email);//!
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;