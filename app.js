const express = require('express')
const path = require('path')
const ajax = require('./api/api')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})
app.use('/log', ajax);

var asu = process.env.PORT || 3000;
app.listen(asu, ()=>{
    console.log("WES MLAKU TEK PORT : " + asu);
});

module.exports = app;