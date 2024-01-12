

//Replace "applied" with the actual DB collection - Ctrl+Shift+F
 
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

async function loadPostOwner(req, res, next) {
    if (req.params.itemId) {
        const item = await itemServices.getOne(req.params.itemId);
        if (item) {
            req.postOwner = await itemServices.findOwner(item.owner).lean();
        }
    }
    next();
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
    let itemData = await item.toObject();
    let isOwner = itemData.owner == req.user?._id;

    //the postOwner.email / postOwner.description
    let postOwner = await itemServices.findOwner(item.owner).lean();

    let likersInfo = itemData.applied.map(user => {
        return {
            email: user.email,
            description: user.description
        };
    });

    
    let likedPostsList = itemData.applied;//!
    let likesCount = itemData.applied.length;//!

    let likerIds = item.getLikes();
    let isLiked = req.user && likerIds.some(c => c._id == req.user?._id);

    res.render('items/details', { ...
        itemData, isOwner, isLiked,
        likesCount, postOwner, likedPostsList,likersInfo });
});

router.get('/:itemsId/like', async (req, res) => 
{
    const itemsId = req.params.itemsId
    let items = await itemServices.getOne(itemsId);

    items.applied.push(req.user._id);//!
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


//double search:
//Remove if not bonus
router.get('/search', async (req, res) => {
   
    let itemsName1 = req.query.searchName1;//1//!
    console.log(itemsName1);//1//!
    let items = await itemServices.search(itemsName1);//1,2//!

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