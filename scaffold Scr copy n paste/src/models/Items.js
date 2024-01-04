//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:

    
    //copy entity shape validations here:

    
    //pp snippet here:




    
});

itemsSchema.method('getCollection', function () {
    return this.buyingList.map(x => x._id);//!//replace: "buyingList" with the actual collection
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;