/**
 * @file Service de consulta do usuario.
 * @author douglaspands
 * @since 2017-08-25
 */
'use strict';
// Model usuario
const User = require('../domains/user');
/**
 * Consultar usuario
 * @function consultar
 * @param {string} id ID do usuario.
 * @return {Promise.<object>} Retorna dados objeto usuario.
 */
const consultar = (id) => {
    return new Promise((resolve, reject) => {
        if (id === '0001') {
            let user = new User();
            user.setId = id;
            user.setNome = 'Robert Jones';
            user.setIdade = 25;
            return resolve(user);
        } else {
            return resolve();
        }
    });
};

module.exports = {
    consultar
}; 