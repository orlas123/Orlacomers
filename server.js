const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Serve arquivos estáticos (HTML, CSS, JS, imagens) a partir do diretório "ecomers"
app.use(express.static(path.join(__dirname, 'ECOMERS')));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ecomers', 'index.html'));
});

// Rota para servir arquivos CSS
app.get('/css/:filename', (req, res) => {
  const filename = req.params.filename;
  const cssPath = path.join(__dirname, 'ecomers', 'css', filename);
  res.sendFile(cssPath);
});

// Rota para servir arquivos JavaScript
app.get('/js/:filename', (req, res) => {
  const filename = req.params.filename;
  const jsPath = path.join(__dirname, 'ecomers', 'js', filename);
  res.sendFile(jsPath);
});

// Rota para servir arquivos de imagem
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'ecomers', 'images', filename);
  res.sendFile(imagePath);
});




// Middleware para parsear o corpo da requisição
app.use(express.json());

// Rota de login
app.post('/login', (req, res) => {
    const { nome, numero } = req.body;
    if (nome && numero) {
        res.json({ nome, numero });
    } else {
        res.status(400).json({ error: 'Nome e número são obrigatórios' });
    }
});

// Rota para adicionar ao carrinho
app.post('/cart/add', (req, res) => {
    const { product, price, image } = req.body;
    // Aqui você pode salvar os itens do carrinho em uma estrutura de dados (array, objeto, etc.)
    res.json({ message: 'Produto adicionado ao carrinho' });
});

// Rota para obter os itens do carrinho
app.get('/cart/items', (req, res) => {
    // Aqui você pode recuperar os itens do carrinho da estrutura de dados
    const cartItems = [
        { product: 'bolsa', price: 3000, image: './bus.jpg' }
    ];
    res.json(cartItems);
});

// Rota para finalizar a compra
app.post('/checkout', (req, res) => {
    const orderCode = Math.floor(Math.random() * 10000);
    res.json({ orderCode });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
