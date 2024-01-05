//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
//copy entity shape here:
// ⦁	name – string (required) - at least 2 characters.
// ⦁	species – string (required) - at least 3 characters.
// ⦁	skinColor – string (required) - at least 3 characters.
// ⦁	eyeColor – string (required) - at least 3 characters.
// ⦁	image - string (required) - http:// or https://
// ⦁	description – string (required) - least 5 and no longer than 500 characters
// ⦁	votes – an array of objects containing the users' ID
// ⦁	owner – object ID (a reference to the User model)
    //copy entity shape validations here:

    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    species: {
        type: String,
        required: true,
        minLength: 3,
    },
    skinColor: {
        type: String,
        required: true,
        minLength: 3,
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: 3,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500,
    },
    votes: [
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
    return this.votes.map(x => x._id);//!//replace: "votes" with the actual collection
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;