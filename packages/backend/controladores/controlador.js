const Mdl = require("../modelos/modelo");

const cadastrarPessoa = async (request, h) => {
  try {
    await Mdl.cadastrarPessoa(request);

    return h.response({ message: "Dados salvos com sucesso!" }).code(201);
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    return h.response({ message: "Erro ao salvar os dados." }).code(500);
  }
};

module.exports = {
  cadastrarPessoa,
};
