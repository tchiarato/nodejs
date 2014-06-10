var fs          = require('fs'),
    Transform   = require('stream').Transform,
    _           = require('underscore');

module.exports = function() {
    this.process = function(path, context) {

        var writeStream = fs.createWriteStream(path);
        var readStream  = fs.createReadStream(path);

        var parser = new Transform({objectMode: true});
        parser._transform = function(data, encoding, done) {

            var logs = [];
            var lines = data.toString('utf-8').split('\n');

            lines.forEach(function(item) {
                var date = Date.parse(item.substr(20, 20).replace(":", " "));
                var log = {
                    date: date,
                    log: item
                }
                logs.push(log);
            }); 

            var result = _.sortBy(logs, function(log) {
                return log.date;
            });

            var self = this;
            result.forEach(function(item) {
                self.push(item.log);
            });

            done();
        }

        readStream
            .pipe(parser)
            .pipe(writeStream);

        context.emit();
    };
};

// 177.126.180.83 - - [15/Aug/2013:14:54:38 -0300]