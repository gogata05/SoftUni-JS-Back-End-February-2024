//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref
//replace: "buyingList" with the actual collection - Ctrl+Shift+F


const mongoose = require('mongoose');
let itemSchema = new mongoose.Schema({
    //copy entity shape here:

    
    //copy entity shape validations here:

    
    //pp snippet here:


    
    

}
//,{timestamps: true} //adds "createdAt" and "updatedAt" post properties
);

itemSchema.method('getLikes', function () {
    return this.buyingList.map(x => x._id);//!
})
itemSchema.method('getUsernames', function () {
    return this.buyingList.map(x => x.username);//!
})
itemSchema.method('getEmails', function () {
    return this.buyingList.map(x => x.email);//!
})

let Item = mongoose.model('Item', itemSchema);
module.exports = Item;