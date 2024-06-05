const Hapi = require("@hapi/hapi");
const Controler = require("./controladores/controlador");
const { Paths } = require("@stt/utilitarios/dist")

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "150.162.202.14",
    routes: {
      cors: {
        origin: ["*"],
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
