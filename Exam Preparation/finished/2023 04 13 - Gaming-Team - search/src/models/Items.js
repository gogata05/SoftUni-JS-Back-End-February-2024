//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
//     Game
// ⦁	name: string (required), - should be at least four characters.
// ⦁	image: string (required), - should start with "http://" or "https://".
// ⦁	price: number (required), -  should be a positive number.
// ⦁	description: string (required), - should be at least ten characters long.
// ⦁	genre: string (required), - at least two characters long.
// ⦁	platform: string (required; one of the following: - "PC", "Nintendo", "PS4", "PS5", "XBOX"),
// ⦁	boughtBy: a collection (array) of users (references to the "User" model)
// ⦁	owner: object ID (a reference to the "User" model)

    //copy entity shape validations here:
    //pp snippet here:
    name: {
        type: String,
        required: true,
        minLength: 4,
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
    genre: {
        type: String,
        required: true,
        minLength: 2,
    },
    platform: {
        type: String,
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX']
    },
    boughtBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
});

itemsSchema.method('getCollection', function () {
    return this.boughtBy.map(x => x._id);//!//replace: "buyingList" with the actual collection
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;