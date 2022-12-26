const Product = require('../models/Product');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductController {
    show(req, res, next) {
        Product.findOne({ _id: req.params.slug })
            .then(product => {
                console.log(req.params.slug)
                console.log(product)
                // res.json(product)
                res.render('product/show', { product: mongooseToObject(product) });
            })
            .catch(next)
    }

    async loadMore(req, res) {
        var limit = 2;
        if (fields) {
            var startFrom = parseInt(req.fields.startFrom);
            var users = await database.collection("user").find({})
                .sort({ "id": -1 })
                .skip(startFrom)
                .limit(limit)
                .toArray();
            res.render('product/renderProduct', { users })
        }

        // res.render('news')
    }
}

module.exports = new ProductController();