/**
 * @file Configurações do servidor Restify.
 * @author douglaspands
 * @since 2017-08-28
 */
'use strict';
// Modulo Restify
const restify = require('restify');
// Modulo Bunyan
const Logger = require('bunyan');
// Modulo para geração de log no ElasticSearch
const logFactory = require('restify-log-middleware');
// Package.json
const config = require('../package.json');
// server
let servidor = {};
// host
let host = 'localhost';
// host
let url = '';
// port
let porta = process.env[2] || '3000';
// Config Log
const log = new Logger.createLogger({
    name: config.name,
    serializers: Logger.stdSerializers
});
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
            version: config.version
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
        }));
    return servidor;
};
/**
 * Executa a função a cada rota cadastrada no servidor.
 * @function forEachRoute
 * @param {function} funcao Função que será executada a cada rota encontrada. 
 * @return {array} Retorna uma lista de retorno das funções executadas.
 */
const forEachRoute = (funcao) => {
    // Modulo Lodash
    const _ = require('lodash');
    // Retorno        
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
    // Iniciando servidor
    servidor.listen(porta, host, () => {
        url = servidor.url;
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
/**
 * Retorna o porta do servidor.
 * @function getPort
 * @return {string} Porta do servidor.
 */
const getPort = () => {
    return porta;
};
/**
 * Retorna o host do servidor.
 * @function getHost
 * @return {string} Host do servidor.
 */
const getHost = () => {
    return host;
};
/**
 * Retorna a URL do servidor.
 * @function getURL
 * @return {string} URL do servidor.
 */
const getURL = () => {
    return url;
};
/**
 * Gera .
 * @function getURL
 * @return {string} URL do servidor.
 */
const logging = () => {
    let option = {
        log: log,
        event: 'routed',
        server: servidor
    };
    // Geração de Log do Restify
    servidor.on(option.event, restify.plugins.auditLogger(option));
    // Obter configurações do ElasticSearch
    let elasticSearchConfig = require('../config/elasticSearch');
    elasticSearchConfig.logName = config.name;
    // Gerando Log do Restify no ElasticSearch
    servidor.use(logFactory.createLogMiddleware(config.name, elasticSearchConfig));
    return;
};
// Modulos exportados
module.exports = {
    create,
    forEachRoute,
    start,
    context,
    getPort,
    getHost,
    getURL,
    logging
};
