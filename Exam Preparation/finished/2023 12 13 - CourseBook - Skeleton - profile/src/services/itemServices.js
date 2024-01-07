

//Replace "signUpList" with the actual DB collection
//Replace "enumNameProperty" with the actual "enum" property
//Replace "firstSearchNameProperty" with the actual "name" property
//check if "owner" DB property  exists

const Items = require('../models/Items');
const User = require('../models/User');

exports.findOwner = (userId) => User.findById(userId).lean();

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.getAll = () => Items.find().lean();

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);


exports.getOne = (itemsId) => Items.findById(itemsId).populate('signUpList');//!

//profile
exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.getMyLikedPosts = (userId) => Items.find({ signUpList: userId}).lean();//!


//home
exports.getTopThree = () => Items.find().sort({createdAt: -1}).limit(3);//get the last 3 posts from dash in home

