/**
 * @file Motor de RESTful APIs em Node.js
 * @author @douglaspands
 * @since 2017-08-25
 */
'use strict';
// Modulo Restify
const restify = require('restify');
// Modulo Lodash
const _ = require('lodash');
// Modulo FS
const fs = require('fs');
// Modulo Path
const path = require('path');
// Modulo Bunyan
const Logger = require('bunyan');
// Package.json
const config = require('./package.json');
// Criando e configurando servidor
const server = restify
    // Create server
    .createServer({
        name: config.name,
        version: config.version,
        // Config Log
        log: new Logger.createLogger({
            name: config.name,
            serializers: {
                req: Logger.stdSerializers.req
            }
        })
    })
    // GzipResponse
    .use(restify.plugins.gzipResponse())
    // QueryParser
    .use(restify.plugins.queryParser({
        mapParams: false
    }))
    // BodyParser
    .use(restify.plugins.bodyParser({
        mapParams: false
    }))
    // JSONP
    .use(restify.plugins.jsonp())
    // Throttle
    .use(restify.plugins.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }))
    // Request Log
    .pre((req, res, next) => {
        req.log.info({ req: req }, 'REQUEST');
        next();
    })
    ;
// Diretorio de rotas
const dirRotas = path.join(__dirname, 'routes');
// Mapear todas as rotas
_.forEach((fs.readdirSync(dirRotas)),
    rota => {
        try {
            let arquivo = path.join(dirRotas, rota);
            require(arquivo).push(server);
        } catch (error) {
            console.log(error);
        }
    }
);
// Iniciar servidor
const porta = process.env[2] || '3000';
server.listen(porta, 'localhost', () => {
    console.log('> %s listening at %s', server.name, server.url);
});
