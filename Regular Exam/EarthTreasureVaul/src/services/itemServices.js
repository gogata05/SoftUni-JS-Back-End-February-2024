

//Replace "likedList" with the actual DB collection - Ctrl+Shift+F
//Replace "firstSearchNameProperty" with the actual "name" property

//check if "owner" DB property its called "owner" 

                                                

//to access the: owner.username           .populate('owner')           |    {{this.username}}    
//to access the: likers collection:       .populate('likedList')      |    {{likedList}} {{likedList.length}}


const Items = require('../models/Items');
const User = require('../models/User');

exports.findOwner = (userId) => User.findById(userId).lean();

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.edit = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

//dashboard
exports.getAll = () => Items.find().lean().populate('owner');//*

//details,edit,like:
exports.getOne = (itemsId) => Items.findById(itemsId).populate('likedList');//*

//profile:
exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.getMyLikedPosts = (userId) => Items.find({ likedList: userId}).lean();//!


//home:
//access with: {{likedList.length}}
exports.getTopThree = () => Items.find().sort({createdAt: -1}).limit(3).populate('likedList').lean();//get the last 3 "created" posts from dash in home//for "updated" use "sort({updatedAt: -1})"



//Remove if "search" not bonus
exports.search = (itemsName1) => //!
{
    if (itemsName1)//1
    {
        return (Items.find({ name: { $regex: itemsName1, $options: 'i' } }).lean());
    }
}
