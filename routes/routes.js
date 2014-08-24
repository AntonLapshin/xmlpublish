var Transformer = require('../xsl/transformer');

var ERR_DEFAULT = { error: "Default Error"};
var ERR_ROUTE = "Invalid route";
var ERR_METHOD = "Invalid method";
var ERR_PARAM = "Invalid param: ";

function handler(req, res)
{
    var successHandler = function(answer)
    {
        if (answer == undefined)answer = true;
        console.log(answer);
        res.jsonp(answer);
    };

    var errorHandler = function(err)
    {
        console.log("error: " + err + " url: " + req.url);
        res.jsonp(ERR_DEFAULT);
    };

    var param = function(name, type)
    {
        if (type == undefined)type = 'string';
        var value = req.query[name];
        if (value == undefined) throw ERR_PARAM + name;
        if (type == 'int')value = parseInt(value);
        return value;
    };

    var paramNotReq = function(name, type)
    {
        if (type == undefined)type = 'string';
        var value = req.query[name];
        if (value == undefined) return null;
        if (type == 'int')value = parseInt(value);
        return value;
    };

    if (req.url == '/favicon.ico')
    {
        successHandler({});
        return;
    }

    var session = req.session;
    var route = req.params[0];

    if (route == '/')
    {
        successHandler('Hello!');
//        var playerId = param('playerId', 'int');
//        var authKey = param('authKey');
//        Base.auth(session, playerId, authKey).then(successHandler, errorHandler);
        return;
    }

//    if (session.auth == undefined || session.auth == false)
//    {
//        errorHandler(ERR_ISNOT_AUTH);
//        return;
//    }

    switch (route)
    {
        case '/drom':
            var xml = param('xml');
            Transformer.transform(xml, successHandler);
            break;

        default:
            errorHandler(ERR_ROUTE);
    }
}

exports.init = function(app)
{
    app.get('*', function(req, res)
    {
        try
        {
            handler(req, res);
        }
        catch (e)
        {
            console.log("error: " + e + " url: " + req.url);
            res.jsonp(ERR_DEFAULT);
        }
    });
};