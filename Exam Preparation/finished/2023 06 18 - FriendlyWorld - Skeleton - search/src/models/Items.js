//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "donations" with the actual collection


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
// •	name – string (required) - 2
// •	years – number (required) - 1-100
// •	kind – string (required) - 3
// •	image – string (required) - http:// or https://
// •	need - string (required) - least 3 and no longer than 20 characters.
// •	location – string (required) - least 5 and no longer than 15 characters.
// •	description – string (required) - least 5 and no longer than 50 characters.
// •	donations – an array of objects containing the user's ID
// •	owner – object ID (a reference to the User model)
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    years: {
        type: Number,
        required: true,
        minValue: 1,
        maxValue: 100,
    },
    kind: {
        type: String,
        required: true,
        minLength: 3,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    need: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    donations: [
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

itemsSchema.method('getLikes', function () {
    return this.donations.map(x => x._id);//!
})
itemsSchema.method('getEmails', function () {
    return this.donations.map(x => x.email);//!
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;