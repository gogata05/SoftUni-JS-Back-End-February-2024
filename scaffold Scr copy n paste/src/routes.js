



const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const itemsController = require('./controller/itemsController');

router.use(homeController);
router.use('/auth', authController);
router.use('/items', itemsController);
router.use('/*', (req, res) => {
    res.render('404');
});

module.exports = router;