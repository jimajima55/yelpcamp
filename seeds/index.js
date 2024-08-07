const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( () => {
        console.log('MongoDBコネクションOK!!');
    })
    .catch( (e) => {
        console.log('MongoDBコネクションエラー!!');
        console.log('e');
    });

const seedDB =async () => {
    await Campground.deleteMany({});
    const c = new Campground({title: 'オートキャンプ'});
    await c.save();
}

seedDB();