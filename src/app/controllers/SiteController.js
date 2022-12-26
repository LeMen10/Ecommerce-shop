const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { mutipleMongooseToObject } = require('../../util/mongoose')
var { validationResult } = require('express-validator');
const db = require('../../config/db/index');
const { connection } = require('mongoose');

class SiteController {
    // [GET] /home
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', { products: mutipleMongooseToObject(products) });
            })
            .catch(next)
    }

    //[GET] /shop
    shop(req, res, next) {
        var params_q = req.query.q, arrProduct = [];
        var params_category = req.query.category;
        var url_current = req.url;
        const check_param = url_current.split("?");
        // console.log(check_param[1])
        if (check_param[1]) {
            url_current += '&'
            // console.log(url_current)
        }
        Promise.all([Category.find({}), Product.find({})])
            .then(([categories, products]) => {

                products = products.map(product => product.toObject())
                products.forEach(product => {
                    if (params_q && params_category) {
                        if (product.title.toLowerCase().includes(params_q) && product.category.includes(params_category)) {
                            arrProduct.push(product);
                        }
                    }
                    else if (!params_q && params_category) {
                        if (product.category.includes(params_category)) {
                            arrProduct.push(product);
                        }
                    }
                    else if (params_q && !params_category) {
                        if (product.title.toLowerCase().includes(params_q)) {
                            arrProduct.push(product);
                        }
                    }
                    else {
                        arrProduct.push(product);
                    }
                })

                res.render('shop', {
                    categories: mutipleMongooseToObject(categories),
                    products: arrProduct,
                    url_current,
                })
            })
            .catch(next);
    }

    about(req, res) {
        res.render('about')
    }

    contact(req, res) {
        res.render('contact')
    }

    register(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        let encryptedPassword = '';

        User.findOne({ username })
            .then(data => {
                if (data) {
                    res.json('Tài khoản đã tồn tại!!!')
                } else {
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        encryptedPassword = hash;

                        const user = new User({
                            username: username,
                            email: email,
                            password: encryptedPassword,
                        })
                        user.save()
                            .then(() => res.send(user))
                            .catch(error => {
                                res.redirect('/register')
                            });
                    });
                }
            })
            .catch(err => {
                res.status(500).json('Có lỗi Sever!!!')
            })




    }

    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;


        User.findOne({ username, })
            .then(data => {
                if (!data) return res.status(400).json('Bạn chưa đăng ký!!!');
                bcrypt.compare(password, data.password, (err, result) => {
                    if (result) {
                        return res.status(200).json('Đăng nhập thành công');
                    }
                    else {
                        return res.status(300).json('Mật khẩu không đúng!!!');
                    }
                })
            })
            .catch(err => {
                res.status(500).json('Có lỗi Sever!!!')
            })

    }

    user(req, res) {
        //username and password
        const myusername = 'user1'
        const mypassword = 'mypassword'

        // a variable to save a session
        var session;

        if (req.body.username == myusername && req.body.password == mypassword) {
            session = req.session;
            session.userid = req.body.username;
            console.log(req.session)
            res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
        }
        else {
            res.send('Invalid username or password');
        }
    }

    dataUser(req, res, next) {
        User.find({})
            .then(users => {
                res.json({ users: mutipleMongooseToObject(users) });
            })
            .catch(next)
    }

    role(req, res, next) {
        Role.find({})
            .then(roles => {
                res.json({ roles: mutipleMongooseToObject(roles) });
            })
            .catch(next)
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new SiteController();
