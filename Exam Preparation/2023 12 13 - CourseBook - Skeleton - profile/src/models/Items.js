//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
// ⦁	title - string (required), - at least 5 characters
// ⦁	type - string (required), - minimum of 3 characters long
// ⦁	certificate - string (required), - 2 characters long
// ⦁	image: string (required), - http:// or https://
// ⦁	description: string (required), - minimum of 10 characters long
// ⦁	price – number (required), - positive number
// ⦁	signUpList - a collection of Users (a reference to the User model)
// ⦁	owner - object ID (a reference to the User model)
    //copy entity shape validations here:
    //pp snippet here:
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    type: {
        type: String,
        required: true,
        minlength: 3,
    },
    certificate: {
        type: String,
        required: true,
        minlength: 2,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    signUpList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

});

itemsSchema.method('getCollection', function () {
    return this.signUpList.map(x => x._id);//!//replace: "signUpList" with the actual collection
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;