// const Product = require('../models/Product');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    // index(req, res, next) {

    //     Product.find({})
    //         .then(courses => {
    //             res.render('home', {
    //                 courses: mutipleMongooseToObject(courses)
    //             })
    //         })
    //         .catch(next);
    // }
    index(req, res){
        res.render('home');
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
