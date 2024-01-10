

//Replace "commentList " with the actual DB collection - Ctrl+Shift+F
 
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


router.get('/:itemId/details', async (req, res) => {
    let item = await itemServices.getOne(req.params.itemId);
    let itemData = await item.toObject();
    let isOwner = itemData.owner == req.user?._id;

    //the postOwner.email / postOwner.username
    let postOwner = await itemServices.findOwner(item.owner).lean();
    
    
    let likedPostsList = itemData.commentList ;//!
    let likesCount = itemData.commentList .length;//!
    
    ////Users info who liked the post:
    //usernames
    let likedUsersUsernames = item.getUsernames();//SplitBy(',') is by default 
    let likedUsersUsernamesString = likedUsersUsernames.join(", ");//!
    //emails
    let likedUsersEmails = item.getEmails();
    let likedUsersEmailsString  = likedUsersEmails.join(", ");//!

    
    //likes
    let likerIds = item.getComments();
    let isLiked = req.user && likerIds.some(c => c._id == req.user?._id);

    res.render('items/details', { ...
        itemData, isOwner, isLiked,
        likesCount, postOwner, likedPostsList,
        likedUsersUsernamesString, likedUsersEmailsString });
});

router.get('/:itemId/like', async (req, res) => 
{
    const itemId = req.params.itemId
    let items = await itemServices.getOne(itemId);

    items.commentList .push(req.user._id);//!
    await items.save();
    res.redirect(`/items/${req.params.itemId}/details`);
});

router.get('/:itemId/edit', async (req, res) => {
    const itemId = req.params.itemId
    let items = await itemServices.getOne(itemId);
    res.render('items/edit', { ...items.toObject() })
});
router.post('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId;
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


//double search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    //remove #2 if its a "single" search
    
   
    
    let itemsName1 = req.query.searchName1;//1//!
    let itemsName2 = req.query.searchName2;//2//!

    console.log(itemsName1);//1//!
    console.log(itemsName2);//2//!

    let items = await itemServices.search(itemsName1, itemsName2);//1,2//!

    if(items == undefined) {
        items = await itemServices.getAll();
    }    
    res.render('search', {items});
});    


////if the 1st search its not automatically
// router.get('/search', isAuth, async (req, res) => {
    //     const result = { ...req.query }
    //     // console.log(result.search )
    //     let jobs;
    
    //     try {
        
        //         if (!!result.search) {
            //             jobs = await jobService.searchGames(result.search)
            //             console.log(jobs)
            //         }
            //         res.render('jobs/search', { jobs })
            
            //     } catch (err) {
//         res.redirect('/404')                
//     }
// })












module.exports = router;