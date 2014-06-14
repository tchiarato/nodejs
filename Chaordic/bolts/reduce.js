var _ = require('underscore');

module.exports = function() {
    this.process = function(data, context) {
        var result = _.reduce(data, function(memo, row) {
            if (row !== "") {
                var user_id = row.substr(row.indexOf('userid=') + 7, 36);

                if (user_id in memo)
                    memo[user_id].push(row);
                else
                    memo[user_id] = [row];
            }

            return memo;
        }, {});

        context.emit(result);
    };
};