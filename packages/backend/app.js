const Hapi = require("@hapi/hapi");
const Controler = require("./controladores/controlador");

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
    handler: Controler.cadastrarPessoa,
  });

  server.route({
    method: "GET",
    path: "/read",
    handler: Controler.buscarPessoa,
  });

  server.route({
    method: "PUT",
    path: "/update/{cpf}",
    handler: Controler.modificarPessoa,
  });

  server.route({
    method: "DELETE",
    path: "/delete/{cpf}",
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
