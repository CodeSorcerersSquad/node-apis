/**
 * @file Motor de RESTful APIs em Node.js
 * @author @douglaspands
 * @since 2017-08-25
 */
'use strict';
// Lib de criação e configuração do servidor Restify.
const server = require('./libs/restifyServer');
// Lib de escaneamento de diretorios e arquivos.
const scanDir = require('./libs/scanDir')(__dirname);
// Escanear diretorio de rotas.
scanDir.forEachFile('routes', (arquivo, key, arquivoCompleto) => {
    try {
        require(arquivoCompleto).push(server);
    } catch (error) {
        console.log(error);
    }
});
// Iniciar servidor
const porta = process.env[2] || '3000';
server.listen(porta, 'localhost', () => {
    console.log('> %s listening at %s', server.name, server.url);
    console.log(JSON.stringify(server.router.mounts));
});
