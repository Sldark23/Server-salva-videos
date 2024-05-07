const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const port = 3000;

// Configuração do Multer para armazenar os vídeos no diretório 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rota para o formulário de upload de vídeos
app.post('/upload', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  // Extrai o link e o título do vídeo do corpo da requisição
  const { link, titulo } = req.body;

  // Cria um arquivo de texto (.txt) com o link e o título do vídeo na pasta 'uploads'
  const videoFilePath = `uploads/${Date.now()}-${titulo}.txt`;
  await fs.writeFile(videoFilePath, `Título: ${titulo}\nLink: ${link}`);

  res.send('Arquivo de texto criado com sucesso.');
});

app.get('/', function (req, res) {
  res.send('Hello World')
})
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});