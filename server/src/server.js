import express from 'express';
import cors from 'cors';
import * as dbHandler from './dbHandler.js';
import { config } from "dotenv"

const { SERVER_PORT } = (config({ path: "../../.env" }, "SERVER_PORT").parsed)
const app = express();
var tmpPort = SERVER_PORT;
if (!tmpPort) {
    console.log("SERVER_PORT not found in .env file! Using default port: 4500 for server");
    tmpPort = 4500;
}
const port = tmpPort;

app.use(express.json());
app.use(cors());

try {
    dbHandler.CreateDBNotExist();
} catch (err) {
    console.log(err);
    process.exit;
}

app.get('/User/list', async (req, res) => {
    var users = await dbHandler.GetUserList();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
});

app.post('/Login', async (req, res) => {
    var user = req.body;
    if (!user) {
        res.statusMessage = "JSON body not valid";
        res.sendStatus(400);
        return;
    }
    if (!user.username) {
        res.statusMessage = "Username required";
        res.sendStatus(400);
        return;
    }
    if (!user.password) {
        res.statusMessage = "Password required";
        res.sendStatus(400);
        return;
    }
    user.username = user.username.toLowerCase();
    try {
        var newUser = await dbHandler.GetUserWithUsername(user.username);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(500);
        return;
    }
    if (!newUser) {
        res.statusMessage = "Username or password is invalid.";
        res.sendStatus(404);
        return;
    }
    if (newUser.password == user.password) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(newUser));
        return;
    } else {
        res.statusMessage = "Username or password is invalid.";
        res.sendStatus(404);
        return;
    }
});

app.get('/User/details/', async (req, res) => {
    var userId = req.query.id;
    if (!userId) {
        res.statusMessage = "User id is required";
        res.sendStatus(400);
        return;
    }
    if (userId < 0) {
        res.statusMessage = "User id is not valid";
        res.sendStatus(400);
        return;
    }

    var user = await dbHandler.GetUser(userId);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
});

app.post('/User/add', async (req, res) => {
    var user = req.body;
    if (!user) {
        res.statusMessage = "JSON body not valid";
        res.sendStatus(400);
        return;
    }
    if (!user.username) {
        res.statusMessage = "Username required";
        res.sendStatus(400);
        return;
    }
    if (!user.password) {
        res.statusMessage = "Password required";
        res.sendStatus(400);
        return;
    }
    user.username = user.username.toLowerCase();
    try {
        var newUser = await dbHandler.AddUser(user);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newUser));
});

app.post('/User/update', async (req, res) => {
    var user = req.body;
    if (!user) {
        res.statusMessage = "JSON body not valid";
        res.sendStatus(400);
        return;
    }
    if (!user.username) {
        res.statusMessage = "Username required";
        res.sendStatus(400);
        return;
    }
    user.username = user.username.toLowerCase();
    try {
        var newUser = await dbHandler.UpdateUser(user);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newUser));
});

app.delete('/User/delete', async (req, res) => {
    var userId = req.query.id;
    if (!userId) {
        res.statusMessage = 'User id is required'
        res.sendStatus(400);
        return;
    }
    try {
        var userList = dbHandler.DeleteUser(userId);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(404);
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(userList));
});

app.get('/Message/list', async (req, res) => {
    var messages = await dbHandler.GetMessageList();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(messages));
});

app.get('/Message/details', async (req, res) => {
    var messageId = req.query.id;
    if (!messageId) {
        res.statusMessage = "Message id is required";
        res.sendStatus(400);
        return;
    }
    if (messageId < 0) {
        res.statusMessage = "Message id is not valid";
        res.sendStatus(400);
        return;
    }

    var message = await dbHandler.GetMessage(messageId);
    if (!message) {
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(message));
});

app.post('/Message/add', async (req, res) => {
    var message = req.body;
    if (!message) {
        res.statusMessage = "JSON body not valid";
        res.sendStatus(400);
        return;
    }
    if (!message.url) {
        res.statusMessage = "Message URL required";
        res.sendStatus(400);
        return;
    }

    try {
        var newMsg = await dbHandler.AddMessage(message);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newMsg));
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});