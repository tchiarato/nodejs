var fs = require('fs');

module.exports = function() {
    this.process = function(path, context) {

        fs.readFile(path, { encoding: 'utf-8' }, function(err, data){
            if (err) console.log('Erro: ' + err);

            var logs = [];
            var lines = data.split('\n');

            lines.forEach(function(item) {
                if (item !== "") {
                    var user_id = item.substr(item.indexOf('userid=') + 7, 36);
                    var log = {
                        user_id: user_id,
                        log: item
                    }
                    logs.push(log);
                }
            }); 

            context.emit(logs);
        });
    };
};