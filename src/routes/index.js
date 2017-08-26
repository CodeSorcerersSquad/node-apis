/**
 * @file Rota padrão.
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
    server.get('/', (req, res) => res.send(200, { mensagem: 'Servidor de RESTful APIs ativo!' }));
};

module.exports = {
    push
}; 