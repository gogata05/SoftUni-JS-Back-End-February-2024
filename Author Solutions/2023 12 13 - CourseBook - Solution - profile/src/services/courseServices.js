const Course = require('../models/Course');
const User = require('../models/User');

exports.findUser = (userId) => User.findById(userId);
exports.findOwner = (userId) => User.findById(userId);

exports.create = (courseData) => Course.create(courseData);

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.getAll = () => Course.find().lean();

exports.update = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.getOne = (courseId) => Course.findById(courseId).populate('signUpList');

exports.getMyCreatedCourse = (userId) => Course.find({ owner: userId}).lean();


exports.getMySignUp = (userId) => Course.find({ signUpList: userId}).lean();//?

exports.getTopThree = () => Course.find().sort({createdAt: -1}).limit(3);//?
