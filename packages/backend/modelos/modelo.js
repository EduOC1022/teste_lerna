const knex = require("../knex-index");

const Mdl = {

  cadastrarPessoa: async (request) => {
      const { cpf, nome, data_nascimento, email } = request.payload;

      await knex("pessoa").insert({
        cpf: cpf,
        nome: nome,
        data_nascimento: data_nascimento,
        email: email,
      });
  },

  buscarPessoa: async (request, h) => {
    try {
      const result = await knex.select("*").from("pessoa");

      return h
        .response(result)
        .type("application/json")
        .header("content-type", "application/json")
        .code(200);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      return h
        .response({ message: "Erro ao recuperar os dados." })
        .code(500)
        .header("Content-Type", "application/json")
        .type("application/json");
    }
  },

  modificarPessoa: async (request, h) => {
    const { cpf } = request.params;
    const { nome, data_nascimento, email } = request.payload;
    try {
      const result = await knex("pessoa").where("cpf", cpf).update({
        nome,
        data_nascimento,
        email,
      });

      if (result) {
        return h
          .response({ message: "Registro atualizado com sucesso!" })
          .code(200);
      } else {
        return h
          .response({
            message: "Registro não encontrado ou não foi possível atualizar.",
          })
          .code(404);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      return h
        .response({ message: "Erro ao recuperar os dados." })
        .code(500)
        .header("Content-Type", "application/json")
        .type("application/json");
    }
  },

  excluirPessoa: async (request, h) => {
    const { cpf } = request.params;
    try {
      const result = await knex("pessoa").where("cpf", cpf).delete();

      if (result) {
        return h
          .response({ message: "Registro excluído com sucesso!" })
          .code(200);
      } else {
        return h
          .response({
            message: "Registro não encontrado ou não foi possível excluir.",
          })
          .code(404);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
      return h
        .response({ message: "Erro ao recuperar os dados." })
        .code(500)
        .header("Content-Type", "application/json")
        .type("application/json");
    }
  },
};

module.exports = Mdl;