var format      = require('util').format,
    path        = require('path'),
    FileQueue   = require('filequeue'),
    _           = require('underscore'),
    config      = require('../config/config');

module.exports = function() {
    this.process = function(data, context) {
        _.map(data, function(values, key) {
            var fq = new FileQueue(config.OSlimit);

            var __parentDir = path.dirname(process.mainModule.filename);
            var fileName = format('%s/tmp/%s.txt', __parentDir, key);

            var wr = fq.createWriteStream(fileName, { flags: 'a' });
            wr.end(values.join('\n') + '\n');
        });
    };
};
