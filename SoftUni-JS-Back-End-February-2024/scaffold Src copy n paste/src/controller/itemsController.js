



const router = require('express').Router();

const itemsServices = require('../services/itemsServices')

router.get('/catalog', async (req, res) => {
    let items = await itemsServices.getAll();
    res.render('items/catalog', { items });
});

router.get('/create-offer', (req, res) => {
    res.render('items/create');
});

router.post('/create-offer', async (req, res) => {
    try {
        await itemsServices.create({ ...req.body, owner: req.user });
        res.redirect('/items/catalog');
    } catch (error) {
        console.log(error);
        res.render('items/create', { error: error.message });
    }
});

router.get('/:itemsId/details', async (req, res) => {
    let items = await itemsServices.getOne(req.params.itemsId);

    let itemsData = await items.toObject();

    let isOwner = itemsData.owner == req.user?._id;
    let buyer = items.getBuying();

    let isBought = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('items/details', { ...itemsData, isOwner, isBought });
});

router.get('/:itemsId/buy', async (req, res) => {
    const itemsId = req.params.itemsId
    let items = await itemsServices.getOne(itemsId);

    items.buyingList.push(req.user._id);
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
    res.redirect('/items/catalog');
});

router.get('/search', async (req, res) => {
    let itemsName = req.query.searchName;
    let itemsType = req.query.searchType;

    console.log(itemsName);
    console.log(itemsType);

    let items = await itemsServices.search(itemsName, itemsType);

    if(items == undefined) {
        items = await itemsServices.getAll();
    }


    res.render('search', {items});
});

module.exports = router;