const express = require('express');
const users = require('./users');
const config = require('./config').config;

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html', {
        subject: "Technologie webowe w aplikacjach Internetu",
        users: users
    });
});

app.get('/api/users', (request, response) => {
    response.json(users);
});
app.get('/api/users/:id', (request, response) => {
    const userId = request.params.id;
    const user = users.find(user => user.id === userId);

    if (user) {
        response.json(user);
    } else {
        response.status(404).json({ error: "nie ma użytkownika o podanym ID" });
    }
});

app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
});
