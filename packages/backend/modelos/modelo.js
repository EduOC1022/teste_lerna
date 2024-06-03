const knex = require("../knex-index");

const Mdl = {
  cadastrarPessoa: async (query) => {
    const { cpf, nome, data_nascimento, email } = query;

    await knex("pessoa").insert({
      cpf: cpf,
      nome: nome,
      data_nascimento: data_nascimento,
      email: email,
    });
  },

  buscarPessoa: async ({query}) => {
    const { cpf, nome, data_nascimento, email } = query;

    const busca = knex('pessoa')

    if (cpf) {
      busca.whereRaw("CAST(pessoa.cpf AS TEXT) LIKE ?", [`${cpf}%`]);
    }
    if (nome) {
      busca.where('pessoa.nome', 'LIKE', `${nome}%`)
    }
    if (data_nascimento) {
      busca.where('pessoa.data_nascimento', 'LIKE', `${data_nascimento}%`)
    }
    if (email) {
      busca.where('pessoa.email', 'LIKE', `${email}%`)
    }
    return busca

  },

  modificarPessoa: async ({ cpf }, { nome, data_nascimento, email }) => {
    return await knex("pessoa").where("cpf", cpf).update({
      nome,
      data_nascimento,
      email,
    });
  },

  excluirPessoa: async ({ cpf }) => {
    return await knex("pessoa").where("cpf", cpf).delete();
  },
};

module.exports = Mdl;