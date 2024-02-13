

//DB models: pp,db
//minLength,maxLength, minValue,maxValue,validate
//replace: "likedList" with the actual collection - Ctrl+Shift+F


const mongoose = require('mongoose');
let itemSchema = new mongoose.Schema({
    //copy entity shape here:
    // Stones
    // •	name - string (required), - 2
    // •	category - string (required), - 3
    // •	color - string (required), - 2
    // •	image: string (required), - http:// or https://
    // •	location: string (required), - between 5 and 15 characters
    // •	formula: string (required), - between 3 and 30 characters
    // •	description: string (required), - minimum of 10 characters long
    // •	likedList - a collection of Users (a reference to the User model)
    // •	owner - object ID (a reference to the User model)

    name: {
        type: String,
        required: true,
        minLength: 2
    },
    category: {
        type: String,
        required: true,
        minLength: 3
    },
    color: {
        type: String,
        required: true,
        minLength: 2
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    formula: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    likedList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

}
,{timestamps: true} //adds "createdAt" and "updatedAt" post properties
);

itemSchema.method('getLikes', function () {
    return this.likedList.map(x => x._id);//!
})
itemSchema.method('getEmails', function () {
    return this.likedList.map(x => x.email);//!
})

let Item = mongoose.model('Item', itemSchema);
module.exports = Item;