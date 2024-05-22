const knex = require("../knex-index");

const Mdl = {

  cadastrarPessoa: async (query) => {
      const { cpf, nome, data_nascimento, email } = query;

      const consulta = knex("pessoa")
      await knex("pessoa").insert({
        cpf: cpf,
        nome: nome,
        data_nascimento: data_nascimento,
        email: email,
        
      

      });

      return consulta
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