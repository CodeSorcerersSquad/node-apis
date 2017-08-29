/**
 * @file Configurações do servidor Restify
 * @author douglaspands
 * @since 2017-08-28
 */
'use strict';
// Modulo Restify
const restify = require('restify');
// Modulo Bunyan
const Logger = require('bunyan');
// Package.json
const config = require('../package.json');
// Servidor
const servidor = restify
    // Create server
    .createServer({
        name: config.name,
        version: config.version,
        // Config Log
        log: new Logger.createLogger({
            name: config.name,
            serializers: Logger.stdSerializers
        })
    })
    // GzipResponse
    .use(restify.plugins.gzipResponse())
    // JSONP
    .use(restify.plugins.jsonp())
    // QueryParser
    .use(restify.plugins.queryParser({ mapParams: false }))
    // BodyParser
    .use(restify.plugins.bodyParser({ mapParams: false }))
    // Throttle
    .use(restify.plugins.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }))
    // Request Log
    .pre((req, res, next) => {
        req.log.info({ req: req, res: res }, 'REQUEST');
        next();
    })
    ;

module.exports = servidor