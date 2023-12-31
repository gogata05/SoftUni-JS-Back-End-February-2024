



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

//search:
//Remove if not bonus
router.get('/search', async (req, res) => {
    //copy number of searches and name="" from search.hbs here:
    //name=""//1
    //name=""//2
    


    //replace Name1,Name2 with search.hbs names: name=""       //Ctrl+H
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


//profile:
//Remove if not bonus
router.get('/profile', async (req, res) => {
    let userId = req.user._id;
    
    let creatures = await creaturesServices.getMyCreatedPost(userId);
    let owner = await creaturesServices.findOwner(userId);
    console.log(owner);
    
    res.render('profile', { items, owner })
})















module.exports = router;