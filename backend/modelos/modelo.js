const server = require('../bd');

const dados = {
    cadastrar: async ( cpf, nome, data_nascimento, email )=> {
        const query = "INSERT INTO pessoa (cpf, nome, data_nascimento, email) VALUES ($1, $2, $3, $4)";
        const values = [cpf, nome, data_nascimento, email];
        try {
          await server.query(query, values);
        } catch (error) {
          console.error("Erro ao inserir os dados:", error);
          throw error;
      }
    },
    pesquisar: async () => {
        const query = "SELECT * FROM pessoa";
        try {
          const result = await server.query(query);
          return result.rows;
        } catch (error) {
          console.error("Erro ao recuperar os dados:", error);
          throw error;
        }
      }
}

module.exports = dados;