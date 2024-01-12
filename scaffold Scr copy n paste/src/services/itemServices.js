

//Replace "buyingList" with the actual DB collection - Ctrl+Shift+F
//Replace "firstSearchNameProperty" with the actual "name" property
//Replace "secondSearchNameProperty" with the actual "enum" property

//check if "owner" DB property its called "owner" 

                                                

//to access the: owner.username                       .populate('owner')           |          {{this.username}}    
//to access the: likers collection:                   .populate('buyingList')      |          {{buyingList}} {{buyingList.length}}


const Items = require('../models/Items');
const User = require('../models/User');

exports.findOwner = (userId) => User.findById(userId).lean();

exports.create = (itemsData) => Items.create(itemsData);

exports.delete = (itemsId) => Items.findByIdAndDelete(itemsId);

exports.edit = (itemsId, itemsData) => Items.findByIdAndUpdate(itemsId, itemsData).populate('owner');


exports.getAll = () => Items.find().lean().populate('owner');//!

//details,edit,like:
exports.getOne = (itemsId) => Items.findById(itemsId).populate('buyingList');//!

//profile:
exports.getMyCreatedPost = (userId) => Items.find({ owner: userId }).lean();//!

exports.getMyLikedPosts = (userId) => Items.find({ buyingList: userId}).lean();//!


//home:
//access with: {{applied.length}}
exports.getTopThree = () => Items.find().sort({createdAt: -1}).limit(3).populate('buyingList').lean();//get the last 3 "created" posts from dash in home//for "updated" use "sort({updatedAt: -1})"

exports.addComment = async (itemId, commentData) => {
    const item = await Items.findById(itemId);

    item.comments.push(commentData);

    return item.save();
};


//Remove if "search" not bonus
exports.search = (itemsName1, itemsName2) => //!
{
    if (itemsName1)//1
    {
        return (Items.find({ firstSearchNameProperty: { $regex: itemsName1, $options: 'i' } }).lean());
    }
    //remove #2 if its a single search
    if (!itemsName1 && itemsName2)//2
    {
        return (Items.find({ secondSearchNameProperty: itemsName2 }).lean());//!
    }

}


exports.loadLikersInfo = async (itemId) => {
    try {
        const item = await Items.findById(itemId).populate({
            path: 'buyingList',//!
            select: 'email username'//!
        }).lean();

        if (!item || !item.buyingList) {
            console.log('No likers found or invalid item ID.');
            return [];
        }

        return item.buyingList.map(user =>//!
        ({
            email: user.email,//!
            username: user.username//!
        }));
    } catch (error) {
        console.error('Error loading likers info:', error);
        return [];
    }
};