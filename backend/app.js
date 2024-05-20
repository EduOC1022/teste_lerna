const Hapi = require('@hapi/hapi');


const { Pool } = require('pg');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        "routes": {
            "cors": {
                "origin": ["http://localhost:3000"],
                "headers": ["Accept", "Content-Type"],
                "additionalHeaders": ["X-Requested-With"]
            }
        }
    });

    const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
    });


    server.route({
        method: 'POST',
        path: '/create',
        handler: async (request, h) => {
            try {
                const { cpf, nome, data_nascimento, email } = request.payload;
    
                const query = "INSERT INTO pessoa (cpf, nome, data_nascimento, email) VALUES ($1, $2, $3, $4)";
                const values = [cpf, nome, data_nascimento, email];
    
                await pool.query(query, values);
    
                return h.response({ message: "Dados salvos com sucesso!" })
                          .code(201)

            } catch (error) {
                console.error("Erro ao inserir dados:", error);
                return h.response({ message: "Erro ao salvar os dados." })
                        //   .header('Content-Type', 'application/json')
                        //   .type('application/json')
                          .code(500)
            }
        }
    });
    

    server.route({
        method: 'GET',
        path: '/read',
        handler: async (request, h) => {
            try {
                const query = "SELECT * FROM pessoa";
                const result = await pool.query(query);
                return h.response(result.rows)
                        .type('application/json')
                        .header('content-type', 'application/json')
                        .code(200)
            } catch (error) {
                console.error("Erro ao recuperar dados:", error);
                return h.response({ message: "Erro ao recuperar os dados." })
                        .code(500) // Internal Server Error
                        .header('Content-Type', 'application/json')
                        .type('application/json');
            }
        }
    });




    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();