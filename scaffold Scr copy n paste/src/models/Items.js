



const mongoose = require('mongoose');
let ItemsSchema = new mongoose.Schema({
    //copy entity shape here:

    
    //copy entity shape validations here:


    name: {
        type: String,
        required: true,
        minLength: 10,
    },
    type: {
        type: String,
        required: true,
        minLength: 2,
    },
    damages: {
        type: String,
        required: true,
        minLength: 10,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200
    },
    production: {
        type: Number,
        required: true,
        minValue: 1900,
        maxValue: 2023
    },
    exploitation: {
        type: Number,
        required: true,
        minLength: 0,
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

itemsSchema.method('getBuying', function () {//getBuying? whats that?
    return this.buyingList.map(x => x._id);
})

let Likes = mongoose.model('Items', itemsSchema);
module.exports = Likes;