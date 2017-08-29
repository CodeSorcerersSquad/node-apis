/**
 * @file Motor de RESTful APIs em Node.js
 * @author @douglaspands
 * @since 2017-08-25
 */
'use strict';
// Modulo Lodash
const _ = require('lodash');
// Lib de criação e configuração do servidor Restify.
const server = require('./libs/restifyServer');
// Lib de escaneamento de diretorios e arquivos.
const scanDir = require('./libs/scanDir')(__dirname);
// Escanear diretorio de rotas.
scanDir.forEachFile('src/routes', (arquivo, key) => {
    try {
        require(arquivo).push(server);
    } catch (error) {
        console.log(error);
    }
});
// Iniciar servidor
const porta = process.env[2] || '3000';
server.listen(porta, 'localhost', () => {
    _.forEach(server.router.mounts, (rota) => {
        if (_.get(rota, 'spec.method', '') && _.get(rota, 'spec.path', '')) {
            console.log('> route: %s %s', rota.spec.method, rota.spec.path);
        }
    });
    console.log('> %s listening at %s', server.name, server.url);
});
