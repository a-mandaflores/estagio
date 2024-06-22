import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardCadastro from "./CardCadastro";

const CadastroProduto: React.FC = () => {
  const [mostrarCard, setMostrarCard] = useState(false);

  const [data, setData] = useState<{
    nome: string;
    descricao: string;
    valor: number;
    disponivel: string;
  }>({
    nome: "",
    descricao: "",
    valor: 0,
    disponivel: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if((data.nome || data.descricao || data.valor || data.disponivel) == ''){
      console.log('to aqui')
      setMostrarCard(true)
      setTimeout(() => {

        setMostrarCard(false)
      }, 1500)

      return;
    }

    const url = "http://localhost:3000/produtos";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {

        throw new Error("Erro ao salvar produto.");
      }
      handleVerProdutos()
      console.log("Produto salvo com sucesso!");
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error.message);
    }
  };

  const navegate = useNavigate();
  const handleVerProdutos = () => {
    navegate("/ver-produtos");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 flex flex-col justify-center items-center h-screen gap-4"
    >
      <input
        className="inputStyle"
        placeholder="Nome"
        type="text"
        name="nome"
        value={data.nome}
        onChange={handleChange}
      />
      <input
        className="inputStyle"
        placeholder="Descrição"
        type="text"
        name="descricao"
        value={data.descricao}
        onChange={handleChange}
      />
      <input
        className="inputStyle"
        placeholder="Valor do produto"
        type="number"
        name="valor"
        value={data.valor}
        onChange={handleChange}
        step="0.01"
      />

      <select
        className="inputStyle"
        id="disponivel"
        name="disponivel"
        value={data.disponivel}
        onChange={handleChange}
      >
        <option value="">
          Disponivel para venda
        </option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>

      <button
        type="submit"
        className="bg-red-400 p-4 w-64 md:w-80 lg:w-96 text-white rounded-lg shadow-lg "
      >
        Cadastrar produto
      </button>
      <button
        onClick={handleVerProdutos}
        className="bg-white p-4 w-64 md:w-80 lg:w-96 rounded-lg shadow-lg"
      >
        Ver produtos
      </button>

      {mostrarCard && ( 
                <div className="absolute">
                    <CardCadastro paragrafo="Elemento vazio" />
                </div>
            )}
    </form>
  );
};

export default CadastroProduto;
