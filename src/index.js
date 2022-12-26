const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
const formidable = require('express-formidable');
const urlencoded = require('urlencode');
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const db = require('./config/db')


app.use(express.static(path.join(__dirname, 'public')));

db.connect();

const route = require('./routes');
app.use(morgan('combined'))
app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(methodOverride('_method'))

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// cookie parser middleware
app.use(cookieParser());

app.use(express.json());

app.get('/middleware',
  function (req, res, next) {
    if (['vethuong', 'vevip'].includes(req.query.ve)) {
      req.face = 'Gach gach gach!!!'
      return next();
    }
  },
  function (req, res, next) {
    res.json({
      message: 'Successfully',
      face: req.face
    })
  })

// delete cookie
app.get('/deleteCookie', function (req, res) {
  res.clearCookie('name');
  res.send('Da xoa cookie')
});

route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})