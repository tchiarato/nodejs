var FileQueue   = require('filequeue'),
    config      = require('../config/config');

module.exports = DataReader;

function DataReader() {
    this.Read = function(path, callback) {
        this.commands.push({
            path: path,
            callback: callback
        });

        this.ExecReader();
    }

    this.commands = [];
    this.executingFiles = 0;
    this.ExecReader = function() {

        var self = this;
        if (!this.commands.length) return;

        var command = this.commands.shift();

        if (this.executingFiles < 2) {
            this.executingFiles++;

            var fq   = new FileQueue(config.limit),
                last = "";

            // Stream file
            var stream = fq.createReadStream(command.path);

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

                    command.callback(lines);
                }
            })
            .on('end', function() {
                command.callback(last.toString().split('\n'));
                self.executingFiles--;
                self.ExecReader();
            });
        } else {
            this.commands.unshift(command);
        }
    }
}
