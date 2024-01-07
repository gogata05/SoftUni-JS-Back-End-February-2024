

//Replace "votes" with the actual DB collection
 
const router = require('express').Router();
const itemsServices = require('../services/itemsServices')

router.get('/dashboard', async (req, res) => {
    let items = await itemsServices.getAll();
    res.render('items/dashboard', { items });
});

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

router.get('/:itemsId/details', async (req, res) => {
    let items = await itemsServices.getOne(req.params.itemsId);
    let itemsData = await items.toObject();
    let isOwner = itemsData.owner == req.user?._id;

    let itemsOwner = await itemsServices.findOwner(items.owner).lean();

    //ForEach users emails SplittedBy(',')
    let itemInfo = itemsData.votes;//!
    let emails = [];
    itemInfo.forEach((x) => emails.push(x.email));
    emails.join(", ");
    // console.log(creatureInfo);

    let likesCount = itemsData.votes.length;//!
    let liker = items.getLikes();
    let isLiked = req.user && liker.some((c) => c._id == req.user?._id);

    res.render('items/details', { ...itemsData, isOwner, isLiked ,likesCount, itemInfo, emails, itemsOwner });
});

router.get('/:itemsId/like', async (req, res) => 
{
    const itemsId = req.params.itemsId
    let items = await itemsServices.getOne(itemsId);

    items.votes.push(req.user._id);//!
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


module.exports = router;