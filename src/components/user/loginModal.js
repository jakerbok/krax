import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, ButtonGroup, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import * as ServerHandler from '../server/serverHandler';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 4,
    p: 2,
};

export function LoginButton() {
    const [open, setOpen] = useState(false);
    const HandleOpen = () => setOpen(true);
    const HandleClose = () => setOpen(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['userinfo']);
    const [resStatus, setResStatus] = useState(0);
    const [resMsg, setResMsg] = useState('');

    async function HandleLoginClick() {
        const res = await ServerHandler.Login({ username, password });
        setResStatus(res.status);
        setResMsg(res.statusText);
        if (res.ok) {
            res.json().then(json => {
                var user = {
                    id: json.id,
                    name: json.name,
                    username: json.username
                };
                setCookie("userinfo", user, { maxAge: 3600 });
            });
            window.location.reload(false);
        }
    }

    function HandleUserOnChange(e) {
        setUsername(e.target.value);
    }
    function HandlePasswordOnChange(e) {
        setPassword(e.target.value);
    }

    function AlertHandler() {
        if (resStatus === 200) {
            return (<Alert severity="success">Success!</Alert>)
        } else if (resStatus === 400 || resStatus === 404 || resStatus === 403) {
            return (<Alert severity="error">{resMsg}</Alert>);
        } else {
            return (<div />);
        }
    }

    return (
        <div>
            <Button
                onClick={HandleOpen}
                variant="outlined"
                color="inherit">
                Sign in
            </Button>
            <Modal open={open} onClose={HandleClose} aria-labelledby="modal-modal-title">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sign in
                    </Typography>
                    <div className='LoginModal-body'>
                        <TextField id="user-username"
                            value={username}
                            label="Username"
                            variant="standard"
                            onChange={HandleUserOnChange}
                        />
                        <TextField
                            id="user-password"
                            value={password}
                            label="Password"
                            variant="standard"
                            type={"password"}
                            onChange={HandlePasswordOnChange}
                        />
                        <AlertHandler />
                        <ButtonGroup variant='contained' >
                            <Button onClick={HandleLoginClick}>Login</Button>
                            <Button onClick={HandleClose}>Cancel</Button>
                        </ButtonGroup>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export function LogoutButton() {
    const [cookies, removeCookie] = useCookies(['userinfo']);

    function HandleSignOut() {
        removeCookie('userinfo');
        window.location.reload(false);
    }
    return (
        <div>
            <Button
                onClick={HandleSignOut}
                variant="outlined"
                color="inherit">
                Sign out
            </Button>
        </div>
    );
}