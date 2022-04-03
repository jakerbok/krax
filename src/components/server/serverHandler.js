import md5 from 'md5';

var port = 4500;
var ip = "127.0.0.1";
if (process.env.REACT_APP_SERVER_IP) {
    ip = process.env.REACT_APP_SERVER_IP;
}
if (process.env.REACT_APP_SERVER_PORT) {
    port = process.env.REACT_APP_SERVER_PORT;
}

const URL = "http://" + ip + ":" + port + "/";
export async function AddMsg(props) {

    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                url: props.url,
                message: props.message,
                userId: props.userId,
                timestamp: props.timestamp
            }
        )
    };
    return (await fetch(URL + "Message/add", reqOptions));
}

export async function AddUser(props) {
    var password = '';
    if (props.password !== '') {
        password = md5(props.password);
    }
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                username: props.username,
                password: password,
                name: props.name
            }
        )
    };
    return (await fetch(URL + "User/add", reqOptions));
}

export async function UpdateUser(props) {
    var password = '';
    if (props.password !== '') {
        password = md5(props.password);
    }
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                username: props.username,
                password: password,
                name: props.name
            }
        )
    };
    return (await fetch(URL + "User/update", reqOptions));
}

export async function GetAllMsg() {
    const reqOptions = {
        method: 'GET'
    };
    return (await fetch(URL + "Message/list", reqOptions));
}

export async function GetAllUsers() {
    const reqOptions = {
        method: 'GET'
    };
    return (await fetch(URL + "User/list", reqOptions));
}

export async function GetUserDetails(props) {
    const reqOptions = {
        method: 'GET'
    };
    return (await fetch(URL + `User/details?id=${encodeURIComponent(props.userId)}`, reqOptions));
}

export async function Login(props) {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                username: props.username,
                password: md5(props.password)
            }
        )
    };
    return (await fetch(URL + "Login", reqOptions));
}