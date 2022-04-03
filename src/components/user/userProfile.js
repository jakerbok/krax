import { Alert, Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import * as ServerHandler from '../server/serverHandler';

function UserProfile() {
    useEffect(() => {
        setUser(cookies.userinfo);
    }, []);

    const [cookies, setCookie] = useCookies(['userinfo']);
    const [user, setUser] = useState('');
    const [username, setUsername] = useState(cookies.userinfo.username);
    const [name, setName] = useState(cookies.userinfo.name);
    const [password, setPassword] = useState('');
    const [resStatus, setResStatus] = useState(0);
    const [resMsg, setResMsg] = useState('');

    function HandleUsernameOnChange(e) {
        setUsername(e.target.value);
    }
    function HandleNameOnChange(e) {
        setName(e.target.value);
    }
    function HandlePasswordOnChange(e) {
        setPassword(e.target.value);
    }
    function HandleUpdateButtonOnClick(e) {
        if (name === "") {
            setResStatus(400);
            setResMsg("Name field required");
            return;
        }
        updateUser();
        setResStatus(200);
        setResMsg("");
    }

    const updateUser = async () => {
        var user = {
            username: username,
            name: name,
            password: password
        }
        const rawData = await ServerHandler.UpdateUser(user);
        const updatedUser = await rawData.json();
        setCookie("userinfo", updatedUser);
    }

    function AlertHandler() {
        if (resStatus === 200) {
            return (<Alert severity="success">User updated!</Alert>)
        } else if (resStatus === 400 || resStatus === 404 || resStatus === 403) {
            return (<Alert severity="error">{resMsg}</Alert>);
        } else {
            return (<div />);
        }
    }

    return (
        cookies.userinfo && cookies.userinfo.username ? (
            <div className='Generic-body'>
                <Paper elevation={3}>
                    <div className='UserProfile-body'>
                        <h2>Edit user</h2>
                        <Paper elevation={3}>
                            <div className='UserProfile-TextViews'>
                                <TextField id="user-username"
                                    disabled
                                    value={username}
                                    label="Username"
                                    variant="outlined"
                                    onChange={HandleUsernameOnChange}
                                />
                                <TextField
                                    id="user-name"
                                    value={name}
                                    label="Name"
                                    variant="outlined"
                                    onChange={HandleNameOnChange}
                                />
                                <TextField
                                    id="user-password"
                                    value={password}
                                    label="Password"
                                    variant="outlined"
                                    type={"password"}
                                    onChange={HandlePasswordOnChange}
                                />
                                <AlertHandler />
                                <Button onClick={HandleUpdateButtonOnClick} variant="outlined" color="inherit">
                                    Update user
                                </Button>
                            </div>
                        </Paper>
                    </div >
                </Paper>
            </div>
        ) : (
            <Navigate to='/' replace={true} />
        )
    )
}

export default UserProfile;