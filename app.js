const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //res.renderの際に動作する

app.get('/', (req, res) => {
    res.render('home');
});

app.listen('3000', () => {
    console.log('ポート3000でリクエスト待受中.....');
});