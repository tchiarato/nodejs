var FileQueue   = require('filequeue'),
    config      = require('../config/config');

module.exports = DataReader;

function DataReader() {
    this.Read = function(path, callback) {

        var fq   = new FileQueue(config.limit),
            last = "";

        // Stream file
        var stream = fq.createReadStream(path);

        stream
        .on('data', function(data) {

            if (last)
                last += data;
            else
                last = data;

            // Only process with at least 15 mb of data.
            if (last.length > 15 * 1000 * 1000) {
                var lines = last.toString().split('\n');
                last = lines.pop();

                callback(lines);
            }
        })
        .on('end', function() {
            callback(last.toString().split('\n'));
        });
    }
}