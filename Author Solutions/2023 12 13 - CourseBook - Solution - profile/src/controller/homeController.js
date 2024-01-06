



const router = require('express').Router();
const courseServices = require('../services/courseServices');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    let getTop = await courseServices.getTopThree().lean();
    res.render('home', { getTop });
});

router.use('/profile',isAuth, async (req, res) => {
    const userId = req.user._id;
    let items = await courseServices.getMyCreatedCourse(userId);
    let likedPosts = await courseServices.getMyLikedPosts(userId);

    res.render('profile', {likedPosts, items});
});

module.exports = router