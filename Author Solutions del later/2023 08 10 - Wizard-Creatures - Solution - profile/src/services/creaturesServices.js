const Items = require('../models/Creatures');
const User = require('../models/User');

exports.create = (itemsData) => Items.create(itemsData);

exports.getAll = () => Items.find().lean();

exports.getOne = (itemsId) => Items.findById(itemsId).populate('voted');

exports.getMyCreatedPost = (userId) => Items.find({ owner: userId}).lean();

exports.updateOne = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.findOwner = (userId) => User.findById(userId).lean();
