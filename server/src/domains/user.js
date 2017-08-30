/**
 * @file usuario.
 * @author douglaspands
 * @since 2017-08-25
 */
'use strict';
/**
 * Model usuario
 */
class User {

    constructor() {
        this.id = undefined;
        this.nome = undefined;
        this.idade = undefined;
    };

    get getId() {
        return this.id;
    }

    get getNome() {
        return this.nome;
    }

    get getIdade() {
        return this.idade;
    }

    set setId(id) {
        this.id = id;
    }

    set setNome(nome) {
        this.nome = nome;
    }

    set setIdade(idade) {
        this.idade = idade;
    }

}

module.exports = User;
