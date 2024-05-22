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

const buscarPessoa = async (request, h) => {
  try {
    const result = await Mdl.buscarPessoa()

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
};

const modificarPessoa = async (request, h) => {
  const params = request.params;
  const query = request.payload;
  try {
    const result = await Mdl.modificarPessoa(params, query)

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
};

const excluirPessoa = async (request, h) => {
  const params = request.params;
  try {
    const result = await Mdl.excluirPessoa(params)

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
};



module.exports = {
  cadastrarPessoa,
  buscarPessoa,
  modificarPessoa,
  excluirPessoa
};
