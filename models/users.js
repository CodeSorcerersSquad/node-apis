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
const consultar = (id) => {
    return new Promise((resolve, reject) => {
        if (id === '0001') {
            return resolve(
                {
                    nome: 'Robert Jones',
                    idade: 25
                }
            );
        } else {
            return resolve({});
        }
    });
};

module.exports = {
    consultar
}; 