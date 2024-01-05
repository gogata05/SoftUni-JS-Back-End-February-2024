

//Replace "buyingList" with the actual DB collection
//Replace "enumNameProperty" with the actual "enum" property
//Replace "firstSearchNameProperty" with the actual "name" property
//check if "owner" DB property  exists

const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.getAll = () => Items.find().lean();

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.getOne = (itemsId) => Items.findById(itemsId).populate('signUpList');//!


exports.findOwner = (userId) => User.findById(userId).lean();

exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.getMyLikedPosts = (userId) => Items.find({ signUpList: userId}).lean();//!