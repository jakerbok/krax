import { Alert, Button, Paper, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react';
import * as ServerHandler from '../server/serverHandler';

function UserMsg() {
    useEffect(() => {
        if (cookies.userinfo && cookies.userinfo.username) {
            setIsDisabled(false);
        } else {
            setMessage("User have to be logged in");
            setIsDisabled(true);
        }
    }, []);
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState("");
    const [cookies] = useCookies(['userinfo']);

    function HandleMsgChange(e) {
        setMessage(e.target.value);
    }

    function HandleSendMessage() {
        if (message.length > 0) {
            var msg = {
                url: "localhost/messages/id",
                message: message,
                userId: cookies.userinfo.id,
                timestamp: new Intl.DateTimeFormat('se-se', { dateStyle: 'short', timeStyle: 'medium' }).format(Date.now())
            }
            ServerHandler.AddMsg(msg);
            setMessage("");
            setError("");
            window.location.reload(false);
        } else {
            setError("Message can not be empty!");
        }
    }

    function AlertHandler() {
        if (error !== "") {
            return (<Alert severity="error">{error}</Alert>);
        } else {
            return (<div />);
        }
    }

    return (
        <div className='msgBorder1'>
            <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={6}
                margin='normal'
                fullWidth
                value={message}
                onChange={HandleMsgChange}
                disabled={isDisabled}
            />
            <AlertHandler />
            <Button disabled={isDisabled} onClick={HandleSendMessage} color='inherit' variant='contained'>
                Send message
            </Button>

        </div>

    )
}

export default UserMsg;