const Hapi = require("@hapi/hapi");
const Controler = require("./controladores/controlador");
const { Paths } = require("@stt/utilitarios/dist")

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
    path: Paths.CREATE,
    handler: Controler.cadastrarPessoa,
  });

  server.route({
    method: "GET",
    path: Paths.READ,
    handler: Controler.buscarPessoa,
  });

  server.route({
    method: "PUT",
    path: Paths.UPDATE,
    handler: Controler.modificarPessoa,
  });

  server.route({
    method: "DELETE",
    path: Paths.DELETE,
    handler: Controler.excluirPessoa,
  });

  await server.start();
  console.log("Servidor rodando em %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
