const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 5,
    },
    type: {
        type: String,
        require: true,
        minLength: 5,
    },
    certificate: {
        type: String,
        require: true,
        minLength: 2,
    },
    image: {
        type: String,
        require: true,
        validate: /^https?:\/\//i,
        
    },
    description: {
        type: String,
        require: true,
        minLength: 10,
    },
    price: {
        type: Number,
        require: true,
        minValue: 0,
    },
    signUpList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}
,{timestamps: true}//adds "createdAt" and "updatedAt" properties
);

courseSchema.method('getLikes', function () {
    return this.signUpList.map(x => x._id);
});

courseSchema.method('getUsernames', function () {
    return this.signUpList.map(x => x.username);
})
courseSchema.method('getEmails', function () {
    return this.signUpList.map(x => x.email);
})

let Course = mongoose.model('Course', courseSchema);
module.exports = Course;