
//Replace "buyingList" with the actual DB collection


const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.getAll = () => Items.find().lean();

exports.getOne = (itemsId) => Items.findById(itemsId).populate('getCollection');//!

exports.getMyCreatedPost = (userId) => Items.find({ buyingList: userId }).lean();//!

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.findOwner = (userId) => User.findById(userId).lean();//doesnt exist in search bonus

 //replace Name1,Name2 with search.hbs names: name=""       //Ctrl+H
exports.search = (itemsName1, itemsName2) => {
    if (itemsName1) {
        return (Items.find({ name: { $regex: itemsName1, $options: 'i' } }).lean());
    }

    if (!itemsName1 && itemsName2) {
        return (Items.find({ itemsName2: itemsName2 }).lean());
    }

}