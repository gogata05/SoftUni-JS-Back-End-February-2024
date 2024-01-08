//DB models: pp,db
//type,required,minLength,maxLength, minValue,maxValue, validate, type,ref


const mongoose = require('mongoose');
let itemsSchema = new mongoose.Schema({
    //copy entity shape here:
// •	name – string (required) - at least 10 characters.
// •	type – string (required) - at least 2 characters.
// •	damages – string (required) - at least 10 characters.
// •	image - string (required) - http:// or https://.
// •	description – string (required) - between 10 and 200 characters.
// •	production – number (required) - between 1900 and 2023.
// •	exploitation - number (required) - positive number.
// •	price - number (required) - positive number.
// •	buyingList – an array of objects containing the users' ID
// •	owner – object ID (a reference to the User model)
      //copy entity shape validations here:
      //pp snippet here:
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
          maxLength: 200,
      },
      production: {
          type: Number,
          required: true,
          minValue: 1900,
          maxValue: 2023,

      },
      exploitation: {
          type: Number,
          required: true,
          minValue: 0,
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
      },
});

itemsSchema.method('getCollection', function () {
    return this.buyingList.map(x => x._id);
})

let Items = mongoose.model('Items', itemsSchema);
module.exports = Items;