/**
 * @file usuario.
 * @author douglaspands
 * @since 2017-08-25
 */
'use strict';
/**
 * Consultar usuario
 * @function consultar
 * @param {string} id ID do usuario.
 * @return {Promise.<object>} Retorna dados do usuario.
 */
const get = (req, res) => {

    // Modulo Lodash
    const _ = require('lodash');

    // Model do usuario 
    const usuario = require('../models/users');

    // Request
    let id = _.get(req.params, 'id', '');

    // Consultar usuario
    return usuario
        .consultar(id)
        .then(usuario => {
            if (_.isEmpty(usuario)) {
                return res.send(204);
            } else {
                let retorno = {
                    data: usuario
                };
                return res.send(200, retorno);
            }
        });
};

module.exports = {
    get
}; 