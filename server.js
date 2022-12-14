const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

const router = require('./src/routes/web')
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static( 'public'));


app.use('/', router);

app.listen(port, 'localhost', () => {
    console.log(`server listening on port ${port}`)
})
