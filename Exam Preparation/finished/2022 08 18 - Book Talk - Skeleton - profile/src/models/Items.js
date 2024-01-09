//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
// •	Title - String (required), - 2
// •	Author: String (required), - 5
// •	Image: String (required), - http:// or https://.
// •	Review: String (required), - 10
// •	Genre: String (required), - 3
// •	Stars: Number (required) - between 1 and 5,
// •	WishingList – a collection of Users (a reference to the User model)
// •	Owner - object Id (a reference to the User model)
    //pp snippet here:
    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    author: {
        type: String,
        required: true,
        minLength: 5,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    review: {
        type: String,
        required: true,
        minLength: 10,
    },
    genre: {
        type: String,
        required: true,
        minLength: 3,
    },
    stars: {
        type: String,
        required: true,
        minValue: 1,    
        maxValue: 5,
    },
    WishingList: [
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
    return this.WishingList.map(x => x._id);//!//replace: "WishingList" with the actual collection
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;