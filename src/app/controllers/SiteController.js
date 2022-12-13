const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /home
    index(req, res, next) {
        Product.find({})
            .then(product => {
                res.render('home', {product: mutipleMongooseToObject(product)});
            })
            .catch(next)
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
