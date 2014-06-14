var DataReader = require('../helper/dataReader');

module.exports = function() {
    var dr = new DataReader();
    this.process = function(path, context) {
        dr.Read(path, function(data, end) {
            context.emit(data);
        });
    }
}
