

//Replace "applied" with the actual DB collection - Ctrl+Shift+F
 
const router = require('express').Router();
const itemServices = require('../services/itemServices')
const { isAuth } = require('../middleware/authMiddleware');

router.get('/dashboard', async (req, res) => {
    try {
    let items = await itemServices.getAll();
    res.render('items/dashboard', { items });
} catch (error) {
    console.log(error);
    res.status(500).send('Problem with dashboard render');
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


router.get('/:itemsId/details', async (req, res) => {
    try {
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

    } catch (error) {
        console.log(error);
        res.status(500).send('Problem with Details render');
    }
});

router.get('/:itemsId/like', async (req, res) => 
{
    try {
    const itemsId = req.params.itemsId
    let items = await itemServices.getOne(itemsId);

    items.applied.push(req.user._id);//!
    await items.save();
    res.redirect(`/items/${req.params.itemsId}/details`);
} catch (error) {
    console.log(error);
    res.status(500).send('Problem with Like render');
}
});

router.get('/:itemsId/edit', async (req, res) => {
    try {
    const itemsId = req.params.itemsId
    let items = await itemServices.getOne(itemsId);
    res.render('items/edit', { ...items.toObject() })
} catch (error) {
    console.log(error);
    res.status(500).send('Problem with Edit render');
}
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
    try {
    const itemId = req.params.itemId;
    await itemServices.delete(itemId);
    res.redirect('/items/dashboard');
} catch (error) {
    console.log(error);
    res.status(500).send('Problem with delete render');
}
});


//double search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    try {
    let itemsName1 = req.query.searchName1;//1//!
    console.log(itemsName1);//1//!
            // // Добавяне на условие за хвърляне на грешка
            // if (itemsName1 !== "triggerError") {
            //     throw new Error("Умишлено предизвикана грешка");
            // }
    let items = await itemServices.search(itemsName1);//1,2//!

    if(items == undefined) {
        items = await itemServices.getAll();
    }    
    res.render('search', {items});
} catch (error) {
    console.log(error);
    res.status(500).send('Problem with search render');
}
});    



module.exports = router;