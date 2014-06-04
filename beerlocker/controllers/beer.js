// Load required packages
var Beer = require('../models/beer');

// Create endpoint /api/beers for posts
exports.postBeer = function(req, res) {
    // Create a new instance of beer model
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.creator = req.user._id;

    // Save the beer and check for errors
    beer.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'Beer added to the locker', data: beer });
    });
};

// Create endpoint /api/beers for get
exports.getBeers = function(req, res) {

    // Use beer model to find all beers
    Beer.find({ creator: req.user._id })
        .populate('creator')
        .exec(function(err, beers) {
            if (err) res.send(err);

            res.json(beers);
        });
};

exports.getBeer = function(req, res) {
    Beer.find({ creator: req.user._id, _id: req.params.beer_id }, function(err, beer) {
        if (err) res.send(err);

        res.json(beer);
    })
}

// Create endpoint /api/beers/:beer_id for put
exports.putBeer = function(req, res) {

    // Use the beer model to find a specific beer
    Beer.find({ creator: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
        if (err) res.send(err);

        res.json({ message: num + ' updated' });
    });
};

// Create endpoint /api/beers/:beer_id for delete
exports.deleteBeer = function(req, res) {

    Beer.remove({ creator: req.user._id, _id: req.params.beer_id }, function(err) {
        if (err) res.send(err);

        res.json({ message: 'Beer removed from the locker' });
    });
};
