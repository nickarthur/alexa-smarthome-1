"use strict";
// factory function, return response typr based on parameters

var ResponseFactory = function (params,query ,response, type="alexa") {
    console.log(__dirname);
    var ResponseHandler = require("./responses/" + type + ".js");
    return  (new ResponseHandler(JSON.parse(query.params),response)).getResponse();
};

module.exports = ResponseFactory;