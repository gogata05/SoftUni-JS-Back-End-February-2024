//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
    //title
    //type
    //certificate
    //image
    //description
    //price

    title: {
        type: String,
        require: true,
        minLength: 5,
    },
    type: {
        type: String,
        require: true,
        minLength: 5,
    },
    certificate: {
        type: String,
        require: true,
        minLength: 2,
    },
    image: {
        type: String,
        require: true,
        validate: /^https?:\/\//i,
        
    },
    description: {
        type: String,
        require: true,
        minLength: 10,
    },
    price: {
        type: Number,
        require: true,
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
    }
}
,{timestamps: true} //adds "createdAt" and "updatedAt" post properties
);

itemsSchema.method('getLikes', function () {
    return this.signUpList.map(x => x._id);//!
})
itemsSchema.method('getUsernames', function () {
    return this.signUpList.map(x => x.username);//!
})
itemsSchema.method('getEmails', function () {
    return this.signUpList.map(x => x.email);//!
})
const Items = mongoose.model('Items', itemsSchema);
module.exports = Items;