



const router = require('express').Router();
const itemServices = require('../services/itemServices');
const { isAuth } = require('../middleware/authMiddleware');
router.get('/', (req, res) => {
    // let getTop = await itemServices.getTopThree().lean();//last 3 posts to home
    res.render('home');
});

//profile:
//Remove if not bonus
router.get('/items/profile',isAuth, async (req, res) => {
    let userId = req.user._id;
    
    let createdProfilePosts = await itemServices.getMyCreatedPost(userId);
    let likedPosts = await itemServices.getMyLikedPosts(userId);
    let owner = await itemServices.findOwner(userId);
    console.log(owner);
    
    res.render('profile', { createdProfilePosts, likedPosts, owner })
})






module.exports = router;