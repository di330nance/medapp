const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/register', (req, res) => {
    const { login, password, userType } = req.body;


    const dataToSave = `Login: ${login}, Password: ${password}, UserType: ${userType}\n`;

    /* Записываем данные в файл */
    fs.appendFile('registrations.txt', dataToSave, (err) => {
        if (err) {
            console.error('Ошибка записи в файл', err);
            return res.status(500).send('Ошибка сервера');
        }
        res.send(`Registered with login: ${login}`);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
