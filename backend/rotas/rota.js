const { bd } = require('../config');

const rotas = async () => {

    bd.route([
        {
            method: 'POST',
            path: '/cadastro',
            handler: controlador.cadastrar
        },
        {
            method: 'GET',
            path: '/pesquisa',
            handler: controlador.pesquisar
        }
    ])
}

module.exports = rotas