//Replace "buyingList" with the actual DB collection
//Replace "enumNameProperty" with the actual "enum" property


const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.getAll = () => Items.find().lean();

exports.getOne = (itemsId) => Items.findById(itemsId).populate('boughtBy');//!

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.findOwner = (userId) => User.findById(userId).lean();


exports.search = (itemsName1, itemsName2) => {
    if (itemsName1) {
        return (Items.find({ name: { $regex: itemsName1, $options: 'i' } }).lean());
    }

    if (!itemsName1 && itemsName2) {
        return (Items.find({ platform: itemsName2 }).lean());//?
    }

}