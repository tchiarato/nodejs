var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var BeerSchema = new Schema({

    name    : String,
    type    : String,
    quantity: Number,
    creator  : {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Beer', BeerSchema);
