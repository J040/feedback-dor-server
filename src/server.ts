import express from 'express';
import cors from 'cors';
import { routes } from './routes';

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar informação única de uma entidade
// DELETE = Deletar informação

const app = express();

//controle de segurança (não permite qualquer frontend acessar o backend)
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));
app.use(cors()); //aberto

app.use(express.json()); //middleware para ler requisições em JSON
app.use(routes);

app.listen(process.env.PORT || 4242, () => {
  console.log(`HTTP server running on port ${process.env.PORT ? process.env.PORT : 4242} :)`);
});