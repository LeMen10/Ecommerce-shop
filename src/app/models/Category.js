const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    key: { type: String, maxLenght: 255 },
    name: { type: String, maxLenght: 255 },
    title: { type: String, maxLenght: 255 },
    count: { type: Number },
    img: { type: String, maxLenght: 255 },
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Category', Category)