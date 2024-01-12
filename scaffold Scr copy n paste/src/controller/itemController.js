

//Replace "buyingList" with the actual DB collection - Ctrl+Shift+F
 
const router = require('express').Router();
const itemServices = require('../services/itemServices')
const { isAuth } = require('../middleware/authMiddleware');

//comment this if problems with errors:
// async function checkIsOwner(req, res, next) {
//     let item = await itemServices.getOne(req.params.itemId);

//     if (item.owner == req.user._id) {
//         next();
//     } else {
//         res.redirect(`/item/${req.params.itemId}/details`);
//     }
// }


router.get('/dashboard', async (req, res) => {
    try {
        let items = await itemServices.getAll();
        res.render('items/dashboard', { items });
    } catch (error) {
        console.log(error);
        res.render('items/dashboard', { error: error.message });
    }
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


router.get('/:itemId/details', async (req, res) => {
    try {
    let item = await itemServices.getOne(req.params.itemId);
    let itemData = await item.toObject();
    let isOwner = itemData.owner == req.user?._id;

    //access with: postOwner.email / postOwner.username
    let postOwner = await itemServices.findOwner(item.owner).lean();
    

    //let postLikersInfo = await itemServices.loadLikersInfo(req.params.itemId);
    
    ////Users info who liked the post:
    //access with: {{this.email}} {{this.username}}
    let postLikersInfo = itemData.buyingList.map(user => {
        return {
            email: user.email,//!
            username: user.username,//!
        };
    });
    
    //let likedPostsList = itemData.buyingList;////maybe not needed
    
    ////Users info who liked the post:
    //usernames
    let likedUsersUsernames = item.getUsernames();//SplitBy(',') is by default 
    let likedUsersUsernamesString = likedUsersUsernames.join(", ");//!
    //emails
    let likedUsersEmails = item.getEmails();
    let likedUsersEmailsString  = likedUsersEmails.join(", ");//!
    
    //likes
    let likerIds = item.getLikes();
    let isLiked = req.user && likerIds.some(c => c._id == req.user?._id);
    let likesCount = itemData.buyingList.length;//!

    res.render('items/details', { ...
        itemData, isOwner, isLiked,
        likesCount, postOwner, postLikersInfo,
        likedUsersUsernamesString, likedUsersEmailsString, });

    } catch (error) {
        console.log(error);
        res.render('items/details', { error: error.message });
    }
});

router.get('/:itemId/like', async (req, res) => 
{
    try {
        const itemId = req.params.itemId
        let items = await itemServices.getOne(itemId);

        items.buyingList.push(req.user._id);//!
        await items.save();
        res.redirect(`/items/${req.params.itemId}/details`);
    } catch (error) {
        console.log(error);
        res.render('items/details', { error: error.message });
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId
        let items = await itemServices.getOne(itemId);
        res.render('items/edit', { ...items.toObject() })
    } catch (error) {
        console.log(error);
        res.render('items/edit', { error: error.message });
    }
});
router.post('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const itemData = req.body;
        console.log(itemData);
        await itemServices.edit(itemId, itemData);
        res.redirect(`/items/${itemId}/details`);
    } catch (error) {
        res.render('items/edit', { error: error.message})
    }
});

router.get('/:itemId/delete', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await itemServices.delete(itemId);
        res.redirect('/items/dashboard');
    } catch (error) {
        console.log(error);
        res.render('items/details', { error: error.message });
    }
});


//double search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    //remove #2 if its a "single" search

    try {
        let itemsName1 = req.query.searchName1;//1//!
        let itemsName2 = req.query.searchName2;//2//!

        console.log(itemsName1);//1//!
        console.log(itemsName2);//2//!

        let items = await itemServices.search(itemsName1, itemsName2);//1,2//!

        if(items == undefined) {
            items = await itemServices.getAll();
        }    
        res.render('search', {items});
    } catch (error) {
        console.log(error);
        res.render('/search', { error: error.message });
    }
});    




module.exports = router;