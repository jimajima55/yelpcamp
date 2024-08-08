const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan')
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true ,useFindAndModify: false})
    .then( () => {
        console.log('MongoDBコネクションOK!!');
    })
    .catch( (e) => {
        console.log('MongoDBコネクションエラー!!');
        console.log('e');
    });
    
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //res.renderの際に動作する

// formのリクエストをparseする
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({}); 
    res.render('campgrounds/index', { campgrounds });
});

// idパスの後に設定すると、/newが/:idとして認識されてしまうから注意
app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id/edit', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req,res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req,res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.listen('3000', () => {
    console.log('ポート3000でリクエスト待受中.....');
});