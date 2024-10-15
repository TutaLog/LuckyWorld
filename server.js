const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const USERS_FILE = './users.json';


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


function readUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
}


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});




function saveUser(newUser) {
    const users = readUsers();
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

 
    if (users.find(u => u.email === email)) {
        return res.json({ success: false, message: 'Email già registrata' });
    }


    saveUser({ email, password });
    res.json({ success: true });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();


    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
