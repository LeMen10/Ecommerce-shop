const mongoose = require('mongoose');

async function connect(){
    try {
        mongoose.connect('mongodb://localhost:27017/nest_ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully')
    } catch (error) {
        console.log('Faillyy')
    }
}

module.exports = { connect }