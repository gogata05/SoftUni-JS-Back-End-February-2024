




const router = require('express').Router();
const courseServices = require('../services/courseServices');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    let getTop = await courseServices.getTopThree().lean();
    res.render('home', { getTop });
});

router.use('/profile',isAuth, async (req, res) => {
    const userId = req.user._id;
    let createdPostsList = await courseServices.getMyCreatedCourse(userId);
    let likedPostsList = await courseServices.getMyLikedPosts(userId);

    res.render('profile', {createdPostsList, likedPostsList});
});

module.exports = router