var P = require('./p');

exports.start = function () {
    var Express = require('express');
    var Routes = require('./routes/routes');

    var app = Express();
    app.configure(function () {
        app.use(Express.compress());
        app.use(Express.cookieParser());
        app.use(Express.session({ secret: 'iuBviX21'}));
    });

    var promise = P.promise();

    Routes.init(app);
    app.listen(Number(process.env.PORT || 8081));
    promise.fulfill();

    return promise;
};


