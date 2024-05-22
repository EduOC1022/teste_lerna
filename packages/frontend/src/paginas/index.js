import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastrar from "../componentes/cadastro";
import Pesquisar from "../componentes/pesquisa";

const Home = () => {
  return (
    <BrowserRouter>
      {/* <Menu /> */}
      <Routes>
        <Route path="/" exact element={<Pesquisar/>} />
        <Route path="/create" exact element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
