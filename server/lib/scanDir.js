/**
 * @file Varre pasta e retorna lista de arquivos.
 * @author douglaspands
 * @since 2017-08-28
 */
'use strict';
// Modulo FS
const fs = require('fs');
// Modulo Path
const path = require('path');
// Modulo Lodash
const _ = require('lodash');
/**
 * @constructor
 * @param {string} diretorioRaiz Diretorio raiz.
 * @returns {object} Lista de funções. 
 */
module.exports = diretorioRaiz => {
    let root = diretorioRaiz || '../';
    return {
        /**
         * Executa forEach para cada arquivo encontrado na pasta informada.
         * @param {string|array} pasta Nome da pasta de arquivos ou nome da pasta e o arquivo.
         * @param {callback} callback Função de tratamento.
         * @returns {array} Retorna lista de resultados do callback. 
         */
        forEach: (pasta, callback) => {
            // Valida parametros de entrada
            if (!(_.isString(pasta) || (_.isArray(pasta) && (_.size(pasta) === 2))) || !_.isFunction(callback)) {
                return [];
            }
            // Diretorio de rotas
            let folder = _.isString(pasta) ? pasta : pasta[0];
            let file = _.isArray(pasta) ? pasta[1] : ''
            const diretorio = path.join(root, folder);
            let lista = _.reduce((fs.readdirSync(diretorio)), (acum, arquivo, key) => {
                let resultado = undefined;
                let arquivoCompleto = '';
                if (file){
                    arquivoCompleto = path.join(diretorio, arquivo, file);
                    if (fs.existsSync(arquivoCompleto)) {
                        resultado = callback(arquivoCompleto, key);
                    }
                } else {
                    arquivoCompleto = path.join(diretorio, arquivo);
                    resultado = callback(arquivoCompleto, key);
                }
                if (resultado) {
                    acum.push(resultado);
                }
                return acum;
            }, []);
            return lista;
        }
    }
};
