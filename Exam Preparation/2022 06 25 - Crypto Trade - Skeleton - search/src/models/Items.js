//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "buyingList" with the actual collection


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:

    
    //copy entity shape validations here:

    
    //pp snippet here:




    
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