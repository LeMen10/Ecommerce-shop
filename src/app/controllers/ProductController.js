const Product = require('../models/Product');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductController{
    show(req, res, next){
        Product.findOne({ _id: req.params.slug})
            .then(product => {
                // res.json(product)
                res.render('product/show', {product: mongooseToObject(product)});
            })
            .catch(next)
    }
}

module.exports = new ProductController();