



const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const itemController = require('./controller/itemController');

router.use(homeController);
router.use('/auth', authController);
router.use('/items', itemController);
router.use('/*', (req, res) => {
    res.render('404');
});
router.use('/profile', homeController);//!//if profile exists
module.exports = router;