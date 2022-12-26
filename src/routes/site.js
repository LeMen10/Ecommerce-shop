const express = require('express')
const router = express.Router()
const validate = require('../app/validation/validation')
const siteController = require('../app/controllers/SiteController');
const User = require('../app/models/User');

// router.post('/register', validate.validateRegisterUser(), siteController.register);
// router.use('/datauser', siteController.dataUser);
router.use('/role', siteController.role);
router.post('/user', siteController.user)
router.get('/logout', siteController.logout);

router.get('/login', (req, res, next) => {
    res.render('login')
});
router.post('/login', siteController.login);

router.get('/register', (req, res, next) => {
    res.render('register')
});
router.post('/register', siteController.register);

router.use('/contact', siteController.contact);
router.use('/about', siteController.about);
router.use('/shop', siteController.shop);
router.use('/', siteController.index);

module.exports = router;