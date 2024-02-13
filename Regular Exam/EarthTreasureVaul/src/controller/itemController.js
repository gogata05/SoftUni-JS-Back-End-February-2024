

//Replace "likedList" with the actual DB collection - Ctrl+Shift+F
 
const router = require('express').Router();
const itemServices = require('../services/itemServices')
const { isAuth } = require('../middleware/authMiddleware');

router.get('/dashboard', async (req, res) => {
    try {
        let items = await itemServices.getAll();
        res.render('stones/dashboard', { items });
    } catch (error) {
        console.log(error);
        res.render('stones/dashboard', { error: error.message });
    }
});

router.get('/create',isAuth, (req, res) => {
    res.render('stones/create');
});
router.post('/create',isAuth, async (req, res) => {
    try {
        await itemServices.create({ ...req.body, owner: req.user });
        res.redirect('/stones/dashboard');
    } catch (error) {
        console.log(error);
        res.render('stones/create', { error: error.message });
    }
});


router.get('/:itemId/details', async (req, res) => {
    try {
    let item = await itemServices.getOne(req.params.itemId);
    let itemData = await item.toObject();
    let isOwner = itemData.owner == req.user?._id;

    //access with: postOwner.email 
    let postOwner = await itemServices.findOwner(item.owner).lean();
    

    //let postLikersInfo = await itemServices.loadLikersInfo(req.params.itemId);
    
    ////Users info who liked the post:
    //access with: {{this.email}} 
    let postLikersInfo = itemData.likedList.map(user => {
        return {
            email: user.email,//!
           
        };
    });
    
    //let likedPostsList = itemData.likedList;////maybe not needed
    
    ////Users info who liked the post:
    //usernames
    // let likedUsersUsernames = item.getUsernames();//SplitBy(',') is by default 
    // let likedUsersUsernamesString = likedUsersUsernames.join(", ");//!
    //emails
    let likedUsersEmails = item.getEmails();
    let likedUsersEmailsString  = likedUsersEmails.join(", ");//!
    
    //likes
    let likerIds = item.getLikes();
    let isLiked = req.user && likerIds.some(c => c._id == req.user?._id);
    let likesCount = itemData.likedList.length;//!

    res.render('stones/details', { ...
        itemData, isOwner, isLiked,
        likesCount, postOwner, postLikersInfo,
        likedUsersEmailsString, });

    } catch (error) {
        console.log(error);
        res.render('stones/details', { error: error.message });
    }
});

router.get('/:itemId/like', async (req, res) => 
{
    try {
        const itemId = req.params.itemId
        let items = await itemServices.getOne(itemId);

        items.likedList.push(req.user._id);//!
        await items.save();
        res.redirect(`/stones/${req.params.itemId}/details`);
    } catch (error) {
        console.log(error);
        res.render('stones/details', { error: error.message });
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId
        let items = await itemServices.getOne(itemId);
        res.render('stones/edit', { ...items.toObject() })
    } catch (error) {
        console.log(error);
        res.render('stones/edit', { error: error.message });
    }
});
router.post('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const itemData = req.body;
        console.log(itemData);
        await itemServices.edit(itemId, itemData);
        res.redirect(`/stones/${itemId}/details`);
    } catch (error) {
        res.render('stones/edit', { error: error.message})
    }
});

router.get('/:itemId/delete', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await itemServices.delete(itemId);
        res.redirect('/stones/dashboard');
    } catch (error) {
        console.log(error);
        res.render('stones/details', { error: error.message });
    }
});


//double search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    //remove #2 if its a "single" search

    try {
        let itemsName1 = req.query.searchName1;//1//!
        console.log(itemsName1);//1//!
        let items = await itemServices.search(itemsName1);

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