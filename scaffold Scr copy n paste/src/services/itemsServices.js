



const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.getAll = () => Items.find().lean();

exports.getOne = (itemsId) => Items.findById(itemsId).populate('buyingList');//buyingList? its the collection

exports.getMyWishBook = (userId) => Items.find({ buyingList: userId }).lean();//buyingList? its the collection

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.search = (itemsName, itemsType) => {
    if (itemsName) {
        return (Items.find({ name: { $regex: itemsName, $options: 'i' } }).lean());
    }

    if (!itemsName && itemsType) {
        return (Items.find({ itemsType: itemsType }).lean());
    }

}