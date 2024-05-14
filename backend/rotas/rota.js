import server from "../bd"

const rotas = async () => {

    server.route([
        {
            method: 'POST',
            path: '/cadastro',
            handler: controlador.cadastrar
        }
    ])
}

module.exports = rotas