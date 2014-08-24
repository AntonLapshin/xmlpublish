var Vow = require('vow');

exports.promise = Vow.promise;

exports.handler = function(promise){
    return function(err, value){
        if (err) promise.reject(err);
        else promise.fulfill(value);
    }
};

exports.fail = function(promise){
    return function(err){
        promise.reject(err);
    }
};

exports.good = function(promise){
    return function(value){
        promise.fulfill(value);
    }
};