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
         * @param {string} pasta Nome da pasta de arquivos.
         * @param {callback} callback Função de tratamento.
         * @returns {array} Retorna lista de resultados do callback. 
         */
        forEachFile: (pasta, callback) => {
            // Valida parametros de entrada
            if (!_.isString(pasta) || !_.isFunction(callback)) {
                return [];
            }
            // Diretorio de rotas
            const diretorio = path.join(root, pasta);
            let lista = _.reduce((fs.readdirSync(diretorio)), (acum, arquivo, key) => {
                let arquivoCompleto = path.join(diretorio, arquivo);
                let resultado = callback(arquivoCompleto, key);
                if (resultado) {
                    acum.push(resultado);
                }
                return acum;
            }, []);
            return lista;
        }
    }
};
