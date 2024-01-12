



const router = require('express').Router();
const itemServices = require('../services/itemServices');
const { isAuth } = require('../middleware/authMiddleware');
router.get('/',async (req, res) => {
    let getTop = await itemServices.getTopThree();//last 3 posts to home

    res.render('home', { getTop });
});

//profile:
//Remove if not bonus
router.get('/items/profile',isAuth, async (req, res) => {
    let userId = req.user._id;
    
    let createdPosts = await itemServices.getMyCreatedPost(userId);
    let likedPosts = await itemServices.getMyLikedPosts(userId);
    let owner = await itemServices.findOwner(userId);
    console.log(owner);
    
    res.render('profile', { createdPosts, likedPosts, owner })
})






module.exports = router;