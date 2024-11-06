const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');  //1
const path = require('path');   //1
const app = express();
const port = 3000;


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); //1
app.use(express.static(path.join(__dirname, 'public')));    //1

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'login.html'))   //1
});


app.post('/register', (req, res) => {
    const { login, password, userType } = req.body;


    const dataToSave = `Login: ${login}, Password: ${password}, UserType: ${userType}\n`;

    /* Записываем данные в файл */
    fs.appendFile(path.join(__dirname,'public','registrations.txt'), dataToSave, (err) => {  //1
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
