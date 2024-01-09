

//Replace "donations" with the actual DB collection
//Replace "firstSearchNameProperty" with the actual "name" property
//Replace "secondSearchNameProperty" with the actual "enum" property

//check if "owner" DB property its called "owner"

const Items = require('../models/Items');
const User = require('../models/User');

exports.findOwner = (userId) => User.findById(userId).lean();

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.getAll = () => Items.find().lean();

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);


exports.getOne = (itemsId) => Items.findById(itemsId).populate('donations');//!

//profile
exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.getMyLikedPosts = (userId) => Items.find({ donations: userId}).lean();//!


//home
exports.getTopThree = () => Items.find().sort({createdAt: -1}).limit(3);//get the last 3 "created" posts from dash in home//for "updated" use "sort({updatedAt: -1})"


//Remove if "search" not bonus
exports.search = (itemsName1) => 
{
    if (itemsName1)
    {
        return (Items.find({ name: { $regex: itemsName1, $options: 'i' } }).lean());
    }
}