



const router = require('express').Router();

const itemsServices = require('../services/itemsServices')

router.get('/dashboard', async (req, res) => {
    let items = await itemsServices.getAll();
    res.render('items/dashboard', { items });
});

//Create
router.get('/create', (req, res) => {
    res.render('items/create');
});
router.post('/create', async (req, res) => {
    try {
        await itemsServices.create({ ...req.body, owner: req.user });
        res.redirect('/items/dashboard');
    } catch (error) {
        console.log(error);
        res.render('items/create', { error: error.message });
    }
});

//Details
router.get('/:itemsId/details', async (req, res) => {
    let items = await itemsServices.getOne(req.params.itemsId);

    let itemsData = await items.toObject();

    let isOwner = itemsData.owner == req.user?._id;
    let buyer = items.getCollection();

    let isLiked = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('items/details', { ...itemsData, isOwner, isLiked });
});

//like
router.get('/:itemsId/like', async (req, res) => {
    const itemsId = req.params.itemsId
    let items = await itemsServices.getOne(itemsId);

    items.boughtBy.push(req.user._id);//!
    await items.save();
    res.redirect(`/items/${req.params.itemsId}/details`);
});

router.get('/:itemsId/edit', async (req, res) => {
    const itemsId = req.params.itemsId
    let items = await itemsServices.getOne(itemsId);
    res.render('items/edit', { ...items.toObject() })
});
router.post('/:itemsId/edit', async (req, res) => {
    try {
        const itemsId = req.params.itemsId;
        const itemsData = req.body;
        console.log(itemsData);
        await itemsServices.update(itemsId, itemsData);
        res.redirect(`/items/${itemsId}/details`);
    } catch (error) {
        res.render('items/edit', { error: error.message})
    }

});

router.get('/:itemsId/delete', async (req, res) => {
    const itemsId = req.params.itemsId;
    await itemsServices.delete(itemsId);
    res.redirect('/items/dashboard');
});



//search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    //double search:
    

    let itemsName1 = req.query.searchName1;//1//!
    let itemsName2 = req.query.searchName2;//2//!

    console.log(itemsName1);//1//!
    console.log(itemsName2);//2//!

    let items = await itemsServices.search(itemsName1, itemsName2);//1,2//!

    if(items == undefined) {
        items = await itemsServices.getAll();
    }    
    res.render('search', {items});
});    

module.exports = router;