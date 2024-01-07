const router = require('express').Router();
const courseServices = require('../services/courseServices');
const { isAuth } = require('../middleware/authMiddleware');

async function isOwner(req, res, next) {
    let course = await courseServices.getOne(req.params.courseId);

    if (course.owner == req.user._id) {
        res.redirect(`/course/${req.params.courseId}/details`);
    } else {
        next();
    }
}
async function checkIsOwner(req, res, next) {
    let course = await courseServices.getOne(req.params.courseId);

    if (course.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/course/${req.params.courseId}/details`);
    }
}

router.get('/catalog', async (req, res) => {
    let course = await courseServices.getAll();
    res.render('course/catalog', { course });
});

router.get('/create-course', isAuth, async (req, res) => {
    res.render('course/create');
})

router.post('/create-course', isAuth, async (req, res) => {
    console.log(req.user);
    try {
        await courseServices.create({ ...req.body, owner: req.user });
        res.redirect('/course/catalog');
    } catch (error) {
        res.render('course/create', { error: getErrorMessage(error)})
    }

});

function getErrorMessage(error)//
 {
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

router.get('/:courseId/details', async (req, res) => {
    let course = await courseServices.getOne(req.params.courseId);
    let courseData = course.toObject();
    let isOwner = courseData.owner == req.user?._id;
    
    //the postOwner.email / postOwner.username
    let postOwner = await courseServices.findOwner(course.owner).lean();

    let likedPosts = courseData.signUpList;//!
    
    ////Users info who liked the post:
    //usernames
    let likedUsersUsernames = course.getUsernames();//SplitBy(',') is by default 
    let likedUsersUsernameString = likedUsersUsernames.join(", ");//!
    //emails
    let likedUsersEmails = course.getEmails();
    let likedUsersEmailsString  = likedUsersEmails.join(", ");//!
    
    let likesCount = course.signUpList.length;//!
    let likedUsersIds = course.getLikes();
    let isLiked = req.user && likedUsersIds.some(c => c._id == req.user?._id);

    res.render('course/details', { ...
        courseData,
        isOwner,
        isLiked,
        
        postOwner,
        likesCount,
        likedUsersUsernameString,
        likedUsersEmailsString,
    });
});

router.get('/:courseId/sign', async (req, res) => {
    const courseId = req.params.courseId
    let course = await courseServices.getOne(courseId);

    course.signUpList.push(req.user._id);
    await course.save();
    res.redirect(`/course/${req.params.courseId}/details`);
});

router.get('/:courseId/edit', checkIsOwner, async (req, res) => {
    const courseId = req.params.courseId
    let course = await courseServices.getOne(courseId);
    res.render('course/edit', { ...course.toObject() })
});
router.post('/:courseId/edit', checkIsOwner, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseData = req.body;
        await courseServices.update(courseId, courseData);
        res.redirect(`/course/${courseId}/details`);
    } catch (error) {
        res.render('course/edit', { error: getErrorMessage(error)})
    }

});

router.get('/:courseId/delete', checkIsOwner, async (req, res) => {
    const courseId = req.params.courseId;
    await courseServices.delete(courseId);
    res.redirect('/course/catalog');
})

module.exports = router;