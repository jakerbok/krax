import * as fs from 'fs';
const jsonPath = 'db.json';

export function CreateDBNotExist() {
    try {
        LoadJSON();
    } catch {
        var jsonObj = {
            users: [],
            messages: []
        }
        fs.writeFile(jsonPath, "", function (err) {
            if (err) {
                throw err;
            }
            console.log("File: " + jsonPath + " created!");
        })
        fs.writeFileSync(jsonPath, JSON.stringify(jsonObj));
    }
}

function LoadJSON() {
    try {
        var data = fs.readFileSync(jsonPath);
    } catch (err) {
        throw err;
    }
    return JSON.parse(data);
}

function WriteAddUserJSON(jsonData) {
    var origJSON = LoadJSON();
    origJSON.users[origJSON.users.length] = jsonData;
    fs.writeFileSync(jsonPath, JSON.stringify(origJSON));
}

function WriteAddMessageJSON(jsonData) {
    var origJSON = LoadJSON();
    origJSON.messages[origJSON.messages.length] = jsonData;
    fs.writeFileSync(jsonPath, JSON.stringify(origJSON));
}

function WriteSetUserJSON(jsonData) {
    var origJSON = LoadJSON();
    origJSON.users = jsonData;
    fs.writeFileSync(jsonPath, JSON.stringify(origJSON));
}

function WriteUpdateUserJSON(jsonData) {
    var origJSON = LoadJSON();
    origJSON.users = jsonData;
    origJSON.fs.writeFileSync(jsonPath, JSON.stringify(origJSON));
}

function GetUserList() {
    var rawJSON = LoadJSON();
    return rawJSON.users;
}

function GetUser(userId) {
    var userJSON = LoadJSON();
    return userJSON.users.find(usr => usr.id == userId);
}

function GetUserWithUsername(username) {
    var userJSON = LoadJSON();
    return userJSON.users.find(usr => usr.username == username);
}

function AddUser(user) {
    var userJSON = LoadJSON().users;
    var tmpUser = userJSON.find(usr => usr.username == user.username);

    if (tmpUser) {
        throw `User with username: ${user.username} already exists`;
    }
    //To increment the userId in the JSON.
    if (userJSON.length > 0) {
        var lastUsrId = userJSON[userJSON.length - 1].id;
        lastUsrId++;
    } else {
        lastUsrId = 0;
    }

    var newUser = {
        "id": lastUsrId,
        "name": user.name,
        "username": user.username,
        "password": user.password
    };
    WriteAddUserJSON(newUser);
    return newUser;
}

function DeleteUser(userId) {
    var userJSON = LoadJSON().users;
    var index = userJSON.findIndex(usr => usr.id == userId);
    if (index < 0) {
        throw `User with id: ${userId} was not found.`;
    }
    userJSON.splice(index, 1);
    WriteSetUserJSON(userJSON);
    return LoadJSON().users;
}

function UpdateUser(user) {
    var userJSON = LoadJSON().users;
    var index = userJSON.findIndex(usr => usr.username == user.username);
    var prevUser = userJSON[index];

    if (!prevUser) {
        throw `User with username: ${user.username} was not found`;
    }
    var tmpPassword = '';
    if (user.password !== '') {
        tmpPassword = user.password;
    } else {
        tmpPassword = prevUser.password;
    }
    var updatedUser = {
        "id": prevUser.id,
        "name": user.name,
        "username": prevUser.username,
        "password": tmpPassword
    };
    userJSON[index] = updatedUser;
    WriteSetUserJSON(userJSON);
    return updatedUser;
}

function GetMessageList() {
    var rawJSON = LoadJSON();
    return rawJSON.messages;
}

function GetMessage(messageId) {
    var rawJSON = LoadJSON();
    return rawJSON.messages.find(msg => msg.id == messageId);
}

function AddMessage(message) {
    var msgJSON = LoadJSON().messages;

    //To increment the msgId in the JSON.
    if (msgJSON.length > 0) {
        var lastMsgId = msgJSON[msgJSON.length - 1].id;
        lastMsgId++;
    } else {
        lastMsgId = 0;
    }

    const options = { weekday: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' };
    var newMsg = {
        "url": message.url,
        "id": lastMsgId,
        "message": message.message,
        "userId": message.userId,
        "timestamp": message.timestamp
    };
    WriteAddMessageJSON(newMsg);
    return newMsg;
}

export { GetUserList, GetUser, GetUserWithUsername, AddUser, DeleteUser, GetMessageList, GetMessage, AddMessage, UpdateUser };