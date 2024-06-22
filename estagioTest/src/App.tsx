import React from "react";
import { Route, Routes } from "react-router-dom";
import CadastroProduto from "./component/CadastroProduto";
import Produtos from "./component/Produtos"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CadastroProduto/>} />
      <Route path="/ver-produtos" element={<Produtos />}/>
    </Routes>
  );
};

export default App;
