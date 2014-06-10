var _ = require('underscore');

module.exports = function() {
    this.process = function(data, context) {
        var result = _.reduce(data, function(memo, row) {

            if (row.user_id in memo)
                memo[row.user_id].push(row.log);
            else
                memo[row.user_id] = [row.log];

            return memo;
        }, {});

        context.emit(result);
    }
}