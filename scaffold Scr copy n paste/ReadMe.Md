


Shift+Alt
Pin: ItemController,ItemServices

turn of try catch to see nodemon errors



Ctrl+Shift+F
1. buyingList           - with the actual DB "collection"
2. MyCustomDatabase     - with custom ExamName
3. 


0.Drag/drop: scr,packages,Readme.md   into the skeleton (not the whole scaffold folder)
1.Cut everything and put it in "public" folder
2.Remove the not used "bonus" and rename the other one
3.Change DB Name: in constants.js

4.Copy/Paste every single html from skeleton into the .hbs files
5.DB models
6.1.Edit "main.hbs" and Add a div "error" only there
6.2.Edit all .hbs files from "login" to bonus.hbs
7.Controllers


log/reg/logout problems: Ctrl+Shift+F
login.hbs, register.hbs

search problems: Ctrl+Shift+F
itemController.js, itemServices.js
search.hbs, main.hbs, search-card.hbs

profile problems: Ctrl+Shift+F
router.js, main.hbs 
homeController.js, itemServices.js
profile.hbs, profile-card.hbs




User - {{user.username}} {{user.email}}
postOwner - {{postOwner.email}} {{postOwner.username}} or .populate('owner') {{this.owner.username}}
postLikersInfo - {{this.username}} {{this.email}}
Collections - .populate('buyingList') / {{buyingList}} {{buyingList.length}} 
