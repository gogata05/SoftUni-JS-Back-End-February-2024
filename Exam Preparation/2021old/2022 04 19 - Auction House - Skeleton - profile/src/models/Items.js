//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "buyingList" with the actual collection - Ctrl+Shift+F


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
    // •	Title – string (required) - 4
    // •	Description – string - 200
    // •	Category – string (required) - Vehicles, Real Estate, Electronics, Furniture, Other
    // •	Image URL – string
    // •	Price – number (required) - positive number
    // •	Bidder – reference to the User model
    // •	Author –reference to the User model (required)//owner
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    bidder: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    




    
}
//,{timestamps: true} //adds "createdAt" and "updatedAt" post properties
);

itemsSchema.method('getLikes', function () {
    return this.buyingList.map(x => x._id);//!
})
itemsSchema.method('getUsernames', function () {
    return this.buyingList.map(x => x.username);//!
})
itemsSchema.method('getEmails', function () {
    return this.buyingList.map(x => x.email);//!
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;