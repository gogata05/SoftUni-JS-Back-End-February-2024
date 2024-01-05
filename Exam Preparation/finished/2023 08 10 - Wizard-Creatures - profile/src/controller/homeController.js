

const router = require('express').Router();
const itemsServices = require('../services/itemsServices');
router.get('/', (req, res) => {
    res.render('home');
});

//profile:
//Remove if not bonus
router.get('/items/profile', async (req, res) => {
    let userId = req.user._id;
    
    let items = await itemsServices.getMyCreatedPost(userId);
    let owner = await itemsServices.findOwner(userId);
    console.log(owner);
    
    res.render('profile', { items, owner })
})


module.exports = router;