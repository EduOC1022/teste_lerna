const Hapi = require("@hapi/hapi");
const knex = require("./knex-index");
const Controler = require("./controladores/controlador")

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: {
        origin: ["http://localhost:3000"],
      },
    },
  });

//Rotas

  server.route({
    method: "POST",
    path: "/create",
    handler: Controler.cadastrarPessoa
  });

  server.route({
    method: "GET",
    path: "/read",
    handler: async (request, h) => {
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
  });

  server.route({
    method: "PUT",
    path: "/update/{cpf}",
    handler: async (request, h) => {
        const { cpf } = request.params;
        const { nome, data_nascimento, email } = request.payload;
      try {
        const result = await knex("pessoa")
          .where("cpf", cpf)
          .update({
            nome,
            data_nascimento,
            email
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
  });

  server.route({
    method: "DELETE",
    path: "/delete/{cpf}",
    handler: async (request, h) => {
        const { cpf } = request.params;
      try {
        const result = await knex("pessoa")
          .where("cpf", cpf)
          .delete();

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
  });

  await server.start();
  console.log("Servidor rodando em %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
