const knex = require("../knex-index");

const Mdl = {

  cadastrarPessoa: async (request) => {
      const { cpf, nome, data_nascimento, email } = request.payload;

      return await knex("pessoa").insert({
        cpf: cpf,
        nome: nome,
        data_nascimento: data_nascimento,
        email: email,
      });
  },

  buscarPessoa: async () => {
      return await knex.select("*").from("pessoa");
  },

  modificarPessoa: async ({cpf}, {nome, data_nascimento, email }) => {
      return await knex("pessoa").where("cpf", cpf).update({
        nome,
        data_nascimento,
        email,
      })
  },

  excluirPessoa: async ({cpf}) => {
      return await knex("pessoa").where("cpf", cpf).delete();
  },
};

module.exports = Mdl;