const newRouter = require('./news')
const siteRouter = require('./site')
const productRouter = require('./product')

function route(app) {
    app.use('/product', productRouter)
    app.use('/news', newRouter)
    app.use('/', siteRouter)
}

module.exports = route;