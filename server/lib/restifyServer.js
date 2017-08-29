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
// Modulo Lodash
const _ = require('lodash');
// Package.json
const config = require('../package.json');
// Servidor
let servidor = {};
/**
 * Função para criar o servidor
 * @function create
 * @returns {object} Retorna o objeto servidor Restify.
 */
const create = () => {
    // Servidor
    servidor = restify
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
        });
    return servidor;
};
/**
 * Executa a função a cada rota cadastrada no servidor.
 * @function forEachRoute
 * @param {function} funcao Função que será executada a cada rota encontrada. 
 * @return {array} Retorna uma lista de retorno das funções executadas.
 */
const forEachRoute = (funcao) => {
    let retorno = [];
    _.forEach(servidor.router.mounts, (rota, key) => {
        if (_.get(rota, 'spec.method', '') && _.get(rota, 'spec.path', '')) {
            retorno.push(funcao({ method: rota.spec.method, path: rota.spec.path }, key));
        }
    });
    return retorno;
}
/**
 * Iniciar servidor.
 * @function start
 * @param {function} funcao Função que será executada ao iniciar. 
 * @return {void}
 */
const start = (funcao) => {
    // Iniciar servidor
    const porta = process.env[2] || '3000';
    // Iniciando
    servidor.listen(porta, 'localhost', () => {
        return funcao(servidor.name, servidor.url);
    })
};
/**
 * Retorna o servidor Restify.
 * @function context
 * @return {object} Servidor Restify.
 */
const context = () => {
    return servidor;
};
// Modulos exportados
module.exports = {
    create,
    forEachRoute,
    start, 
    context
}