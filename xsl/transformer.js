var libxslt = require('libxslt'),
    libxmljs = require('libxmljs');

var xslString = '<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:template match="/hello-world"><HTML><HEAD><TITLE></TITLE></HEAD><BODY><H1><xsl:value-of select="greeting"/></H1><xsl:apply-templates select="greeter"/></BODY></HTML></xsl:template><xsl:template match="greeter"><DIV>from <I><xsl:value-of select="."/></I></DIV></xsl:template></xsl:stylesheet>';
var xmlString = '<?xml version="1.0"?><?xml-stylesheet type="text/xsl" href="hello.xsl"?><hello-world><greeter>An XSLT Programmer</greeter><greeting>Hello, World!</greeting></hello-world>';

function transform(xmlString, callback){
    var xslObj = libxmljs.parseXml(xslString),
        xsl = libxslt.parse(xslObj);

    var document = libxmljs.parseXml(xmlString);
    xsl.apply(document, function(err, result){
        console.log('Result: ' + result);
        callback(result.toString());
    });
}

exports.transform = transform;