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
const controller = (req, res) => {

    // Modulo Lodash
    const _ = require('lodash');

    // Model do usuario 
    const usuario = require('../services/users');

    // Request
    let id = _.get(req.params, 'id', '');

    // Consultar usuario
    return usuario
        .consultar(id)
        .then(usuario => {
            if (usuario) {
                let retorno = {
                    data: usuario
                };
                return res.send(200, retorno);
            } else {
                return res.send(204);
            }
        });
};

module.exports = controller;