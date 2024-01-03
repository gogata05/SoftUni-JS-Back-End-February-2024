

//Replace "buyingList" with the actual DB collection
//Replace "enumNameProperty" with the actual "enum" property
//Replace "firstSearchNameProperty" with the actual "name" property


const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.getAll = () => Items.find().lean();

exports.getOne = (itemsId) => Items.findById(itemsId).populate('buyingList');//!

exports.getMyCreatedPost = (userId) => Items.find({ buyingList: userId }).lean();//!

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.findOwner = (userId) => User.findById(userId).lean();//doesnt exist in search bonus

exports.search = (itemsName1, itemsName2) => //!
{
    if (itemsName1)//1
    {
        return (Items.find({ firstSearchNameProperty: { $regex: itemsName1, $options: 'i' } }).lean());
    }
    //remove #2 if its a single search
    if (!itemsName1 && itemsName2)//2
    {
        return (Items.find({ enumNameProperty: itemsName2 }).lean());//!
    }

}