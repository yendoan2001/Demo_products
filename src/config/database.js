const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommert').catch(err => {
    console.log('error database connection')
});

module.exports = mongoose;
