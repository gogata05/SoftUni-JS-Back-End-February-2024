

//Replace "signUpList" with the actual DB collection
 
const router = require('express').Router();
const itemServices = require('../services/itemServices')
const { isAuth } = require('../middleware/authMiddleware');

async function checkIsOwner(req, res, next) {
    let item = await itemServices.getOne(req.params.itemId);

    if (item.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/item/${req.params.itemId}/details`);
    }
}



router.get('/dashboard', async (req, res) => {
    let items = await itemServices.getAll();
    res.render('items/dashboard', { items });
});

router.get('/create',isAuth, (req, res) => {
    res.render('items/create');
});
router.post('/create',isAuth, async (req, res) => {
    try {
        await itemServices.create({ ...req.body, owner: req.user });
        res.redirect('/items/dashboard');
    } catch (error) {
        console.log(error);
        res.render('items/create', { error: error.message });
    }
});




router.get('/:itemsId/details', async (req, res) => {
    let item = await itemServices.getOne(req.params.itemsId);
    let itemData = item.toObject();
    let isOwner = itemData.owner == req.user?._id;

    //the postOwner.email / postOwner.username
    let postOwner = await itemServices.findOwner(item.owner).lean();
    
    
    let likedPostsList = itemData.signUpList;//!
    
    ////Users info who liked the post:
    //usernames
    let likedUsersUsernames = item.getUsernames();//SplitBy(',') is by default 
    let likedUsersUsernameString = likedUsersUsernames.join(", ");//!
    //emails
    let likedUsersEmails = item.getEmails();
    let likedUsersEmailsString  = likedUsersEmails.join(", ");//!


    let likesCount = itemData.signUpList.length;//!
    let likerIds = item.getLikes();
    let isLiked = req.user && likerIds.some(c => c._id == req.user?._id);

    res.render('items/details', { ...
        itemData, isOwner, isLiked,
        likesCount, postOwner, likedPostsList,
        likedUsersUsernameString });
});

router.get('/:itemsId/like', async (req, res) => 
{
    const itemsId = req.params.itemsId
    let items = await itemServices.getOne(itemsId);

    items.signUpList.push(req.user._id);//!
    await items.save();
    res.redirect(`/items/${req.params.itemsId}/details`);
});

router.get('/:itemsId/edit', async (req, res) => {
    const itemsId = req.params.itemsId
    let items = await itemServices.getOne(itemsId);
    res.render('items/edit', { ...items.toObject() })
});
router.post('/:itemsId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemsId;
        const itemData = req.body;
        console.log(itemData);
        await itemServices.update(itemId, itemData);
        res.redirect(`/items/${itemId}/details`);
    } catch (error) {
        res.render('items/edit', { error: error.message})
    }

});

router.get('/:itemId/delete', async (req, res) => {
    const itemId = req.params.itemId;
    await itemServices.delete(itemId);
    res.redirect('/items/dashboard');
});


module.exports = router;