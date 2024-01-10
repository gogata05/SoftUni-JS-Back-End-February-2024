//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "applied" with the actual collection - Ctrl+Shift+F


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
//  •	headline - string (required), - 4
// •	location - string (required), - 8
// •	companyName - string (required), - 3
// •	companyDescription - string (required), - max 40
// •	applied - a collection of Users (a reference to the User model)
// •	author - object Id (a reference to the User model),//owner 
headline: {
    type: String,
    required: true,
    minLength: 4,
},
location: {
    type: String,
    required: true,
    minLength: 8,
},
companyName: {
    type: String,
    required: true,
    minLength: 3,
},
companyDescription: {
    type: String,
    required: true,
    maxLength: 40,
},
applied: [
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
    return this.applied.map(x => x._id);//!
})
itemsSchema.method('getEmails', function () {
    return this.applied.map(x => x.email);//!
})
itemsSchema.method('getDescriptions', function () {
    return this.applied.map(x => x.descriptions);//!
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;