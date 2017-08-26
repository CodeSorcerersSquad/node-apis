/**
 * @file Motor de RESTful APIs em Node.js
 * @author @douglaspands
 * @since 2017-08-25
 */
'use strict';
// Modulo Express
const restify = require('restify');
// Modulo Lodash
const _ = require('lodash');
// Modulo FS
const fs = require('fs');
// Modulo Path
const path = require('path');
// Criando e configurando servidor
const server = restify
    // Create server
    .createServer()
    // GzipResponse
    .use(restify.plugins.gzipResponse())
    // QueryParser
    .use(restify.plugins.queryParser({ mapParams: false }))
    // BodyParser
    .use(restify.plugins.bodyParser({ mapParams: false }))
    // Throttle
    .use(restify.plugins.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
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
let host = 'localhost';
let porta = process.env[2] || '3000';
server.listen(porta, host, () => {
    console.log('>> Servidor iniciado no: http://%s:%s', host, porta);
});
