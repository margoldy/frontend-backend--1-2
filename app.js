const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

//список товаров
let products = [
    { id: 1, name: 'Пицца', price: 500 },
    { id: 2, name: 'Сок', price: 150 },
    { id: 3, name: 'Чизкейк', price: 350 }
];

// Главная страница
app.get('/', (req, res) => {
res.send('Главная страница');
}); 

//CRUD
//просмотр всех
app.get('/products', (req, res) => {
    res.json(JSON.stringify(products));
});

//просмотр по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(product);
});

//добавление
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

//редактирование
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    const { name, price } = req.body;
    
    if (name != undefined) product.name = name;
    if (price != undefined) product.price = price;
    
    res.json(product);
});

//удаление
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: 'Удалили' });
});


app.listen(port, () => {
    console.log(`Сервер: http://localhost:${port}`);
});