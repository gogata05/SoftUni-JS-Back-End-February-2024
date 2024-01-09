



const router = require('express').Router();
const itemServices = require('../services/itemServices');
const { isAuth } = require('../middleware/authMiddleware');
router.get('/', (req, res) => {
    // let getTop = await itemServices.getTopThree().lean();//last 3 posts to home
    // let allPost = await itemServices.getAll();
    res.render('home');
});


module.exports = router;