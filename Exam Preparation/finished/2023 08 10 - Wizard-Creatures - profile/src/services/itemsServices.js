

//Replace "votes" with the actual DB collection

const Items = require('../models/Items');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);//create

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.getAll = () => Items.find().lean();//dashboard,search

exports.getOne = (itemsId) => Items.findById(itemsId).populate('votes');//!///edit,details,like

exports.update = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);//edit

exports.getMyCreatedPost = (userId) => Items.find({ owner: userId}).lean();//profile

exports.findOwner = (userId) => User.findById(userId).lean();//profile,details

