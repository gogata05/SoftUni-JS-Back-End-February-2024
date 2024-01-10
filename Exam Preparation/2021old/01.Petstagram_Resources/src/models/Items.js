//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "commentList " with the actual collection - Ctrl+Shift+F


const mongoose = require('mongoose');
let itemSchema = new mongoose.Schema({
    //copy entity shape here:
    // •	name – string (required) - 3
    // •	image – string (required) - valid
    // •	age – number (required)  - at least 1 and no longer than 100 characters. 
    // •	description – string (required) - least 5 and no longer than 50 characters. 
    // •	location – string (required) - least 5 and no longer than 50 characters. 
    // •	commentList – an array of objects containing the user's ID and the comment content: [ { userID: '1234', comment: 'Nice photo!'} ] 
    // •	owner – object ID (a reference to the User model) 
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    age: {
        type: String,
        required: true,
        minValue: 1,
        maxValue: 100,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    commentList: [
        // {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'User',
        // }
         [ { userID: '1234', comment: 'Nice photo!'} ]
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }, 
}
//,{timestamps: true} //adds "createdAt" and "updatedAt" post properties
);

itemSchema.method('getComments', function () {
    return this.commentList .map(x => x._id);//?
})


itemSchema.method('getUsernames', function () {
    return this.commentList .map(x => x.username);//!
})
itemSchema.method('getEmails', function () {
    return this.commentList .map(x => x.email);//!
})

let Item = mongoose.model('Item', itemSchema);
module.exports = Item;