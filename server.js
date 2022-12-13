const express = require('express');
const path = require("path");
const app = express();

const router = require('./src/routes/web')

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static( 'public'));

app.use('/', router);

app.listen(3000, 'localhost', () => {
    console.log('server listening on port 3000')
})
