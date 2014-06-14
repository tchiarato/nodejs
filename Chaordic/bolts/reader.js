var DataReader = require('../helper/dataReader');

module.exports = function() {
    this.process = function(path, context) {
        var dr = new DataReader();

        dr.Read(path, function(data, end) {
            context.emit(data);
        });
    }
}