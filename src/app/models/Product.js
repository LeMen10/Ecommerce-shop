const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
// const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Product = new Schema({
  // _id: {type: Object},
  title: { type: String, maxLenght: 255 },
  price: { type: Number, maxLenght: 255 },
  detail: { type: String},
  category: {type: String},
  img: { type: String, maxLenght: 255 },
  // slug: { type: String, slug: 'name', unique: true },
},
  {
    timestamps: true,
  },
);

// mongoose.plugin(slug);
// Product.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: 'all',
// });

module.exports = mongoose.model('Product', Product)