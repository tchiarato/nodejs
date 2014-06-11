var fs      = require('fs'),
    format  = require('util').format,
    path    = require('path'),
    _       = require('underscore');

module.exports = function() {
    this.process = function(data, context) {
        _.map(data, function(values, key) {
            var __parentDir = path.dirname(process.mainModule.filename);
            var fileName = format('%s/tmp/%s.txt', __parentDir, key);

            var wr = fs.createWriteStream(fileName, { flags: 'a' });
            wr.write(values.join('\n') + '\n');
            wr.end();

            context.emit(fileName);
        });
    };
};