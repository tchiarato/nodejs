var fs      = require('fs'),
    path    = require('path');

module.exports = function() {
    this.start = function(context) {
        var __parentDir = path.dirname(process.mainModule.filename);
        
        fs.readdir('./data/', function(err, files) {
            for (var i = files.length - 1; i >= 0; i--) {
                var file = files[i];
                if (file !== '.DS_Store') {
                    context.emit(__parentDir + '/data/' + file);
                }
            }
        });
    };
};