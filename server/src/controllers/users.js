/**
 * @file usuario.
 * @author douglaspands
 * @since 2017-08-25
 */
'use strict';
/**
 * Controller
 * @function get
 * @param {object} req Objeto de request da API.
 * @param {object} res Objeto de response da API.* 
 * @return {void}
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