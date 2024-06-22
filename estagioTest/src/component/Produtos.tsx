import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Produtos {
  nome: string;
  descricao: string;
  valor: number;
  disponivel: string;
}

const Produtos = () => {
  const url = "http://localhost:3000/produtos";
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [selectButon, setSelectButton] = useState<boolean>(false);
  const [produtosPrev, setProdutosPrev] = useState<Produtos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao carregar os produtos");
        }
        const data = await response.json();
        const reversedData = data.reverse()
        setProdutos(reversedData);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchData();
  }, []);

  const handlePreco = () => {
    setSelectButton((prev) => !prev);
    if (!selectButon) {
      setProdutos((prevProdutos) => {
        setProdutosPrev([...prevProdutos]);
        const sortedProdutos = [...prevProdutos].sort(
          (a, b) => a.valor - b.valor
        );
        return sortedProdutos;
      });

    }else{
        const prod = setProdutos([...produtosPrev])
        return prod

    }
  };

  const navegate = useNavigate();
  const handleVerProdutos = () => {
    navegate("/");
  };


  return (
    <section className=" flex flex-col justify-center items-center min-h-screen bg-gray-50  ">
      <div className=" bg-white p-4 w-9/12 md:w-7/12 lg:w-6/12 shadow-md">
        <div className="flex justify-between">
          <label
            className="button  bg-red-400 text-white "
            htmlFor="MaiorPreco"
          >
            <input
              type="checkbox"
              id="MaiorPreco"
              name="sort"
              checked={selectButon}
              onChange={handlePreco}
              className="w-2"
            />
            <span>Preço: Menor - Maior</span>
          </label>

          <button onClick={handleVerProdutos} className="button font-medium">Cadastrar Produto</button>
        </div>

        <ul className=" ">
          {produtos.map((prod, index) => (
            <li
              key={index}
              className="flex items-center border-b py-4 justify-between text-xs gap-4"
            >
              <div>{prod.nome}</div>
              <div>{prod.descricao}</div>
              <div className="font-medium">{prod.valor}</div>
              <div>{prod.disponivel}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Produtos;
