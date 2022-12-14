const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://YenDoan:yendoan1A@yendoan0501.117vzjo.mongodb.net/ecommert').catch(err => {
    console.log('error database connection')
});

module.exports = mongoose;
