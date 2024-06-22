import express from "express";
import fs from "fs";
import cors from 'cors'

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.use(express.json());

const filePath = "./data/db.json";
app.post("/produtos", (req, res) => {
  const dados = req.body;


  let produtos;

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    produtos = JSON.parse(data)
    console.log(produtos)
  }
  
  produtos.push(dados);

  try {
    
    fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));
    res.status(200).json({ message: "Produto salvo com sucesso." });
  } catch (err) {
    console.error("Erro ao ler ou escrever arquivo JSON:", err);
    res.status(500).json({ error: "Erro ao salvar produto.", err });
  }
});

app.get("/produtos", (req, res) => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const produtos = JSON.parse(data);
    res.json(produtos);
  } else {
    res.json([]);
  }
});


app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
