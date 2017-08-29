/**
 * @file Cadastro das URIs de usuarios.
 * @author douglaspands
 * @since 2017-08-25
 */
'use strict';
/**
 * Cadastrar todas as rotas de usuarios.
 * @param {object} server Modulo do servidor.
 * @returns {void} 
 */
const push = server => {
    // Consultar usuario
    server.get('/users/:id', (req, res) => require('../controllers/users').get(req, res));
};

module.exports = {
    push
}; 