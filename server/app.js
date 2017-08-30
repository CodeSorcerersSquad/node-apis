/**
 * @file Motor de RESTful APIs em Node.js
 * @author @douglaspands
 * @since 2017-08-25
 */
'use strict';
// Lib de criação e configuração do servidor Restify.
const server = require('./lib/restifyServer');
// Lib de escaneamento de diretorios e arquivos.
const scanDir = require('./lib/scanDir')(__dirname);
// Criar servidor
server.create();
// Escanear diretorio de rotas.
scanDir.forEach(['src', 'index.js'], (arquivo, key) => {
    try {
        require(arquivo)(server.context());
    } catch (error) {
        console.log(error);
    }
});
// Gerar Log apos execução das rotas
server.logging();
// Iniciar servidor
server.start(configs => {
    server.forEachRoute((rota) => {
        console.log('> route: %s %s', rota.method, rota.path);
    });
    console.log('> %s@%s listening at %s', configs.name, configs.version, configs.url);
});
