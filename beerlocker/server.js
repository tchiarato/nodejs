var express        = require('express'),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    passport       = require('passport');
    beerController = require('./controllers/beer')
    userController = require('./controllers/user'),
    authController = require('./controllers/auth');

// Connect to he beerlocker mongodb
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser());

// Use the passport package in our application
app.use(passport.initialize());

// Create our express router.
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeer)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

app.listen(3000);

// http://scottksmith.com/blog/2014/05/05/beer-locker-building-a-restful-api-with-node-crud/
