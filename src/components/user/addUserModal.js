import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, ButtonGroup, TextField } from '@mui/material';
import * as serverHandler from '../server/serverHandler';

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

export function CreateUserButton() {
    const [open, setOpen] = useState(false);
    const HandleOpen = () => setOpen(true);
    const HandleClose = () => setOpen(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [resMsg, setResMsg] = useState('');
    const [resStatus, setResStatus] = useState(0);

    async function HandleCreateUserClick() {
        const res = await serverHandler.AddUser({ username, password, name });
        if (res.ok) {
            setResMsg("User created!");
        } else {
            setResMsg(res.statusText);
        }
        setResStatus(res.status);
    }

    function HandleUserOnChange(e) {
        setUsername(e.target.value);
    }
    function HandlePasswordOnChange(e) {
        setPassword(e.target.value);
    }
    function HandleNameOnChange(e) {
        setName(e.target.value);
    }
    function HandleFeedbackMsg(e) {
        if (resStatus === 200) {
            return (<Alert severity="success">{resMsg}</Alert>);
        } else if (resStatus > 0) {
            return (<Alert severity="error">{resMsg}</Alert>);
        }
        return <></>;
    }

    return (
        <div>
            <Button
                onClick={HandleOpen}
                variant="text"
                color="inherit">
                Sign up
            </Button>
            <Modal open={open} onClose={HandleClose} aria-labelledby="modal-modal-title">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create user
                    </Typography>
                    <div className='CreateUser-body'>
                        <TextField
                            id="user-name"
                            value={name}
                            label="Name"
                            variant="outlined"
                            onChange={HandleNameOnChange}
                        />
                        <TextField id="user-username"
                            value={username}
                            label="Username"
                            variant="outlined"
                            onChange={HandleUserOnChange}
                        />
                        <TextField
                            id="user-password"
                            value={password}
                            label="Password"
                            variant="outlined"
                            type={"password"}
                            onChange={HandlePasswordOnChange}
                        />
                        <HandleFeedbackMsg />
                        <ButtonGroup variant='outlined' color='primary'>
                            <Button onClick={HandleCreateUserClick}>Create user</Button>
                            <Button onClick={HandleClose}>Cancel</Button>
                        </ButtonGroup>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
