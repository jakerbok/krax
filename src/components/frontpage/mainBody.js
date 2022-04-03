import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MsgComponent from '../message/msgComponent';
import UserMsg from '../message/userMsg';
import * as ServerHandler from '../server/serverHandler';

function MainBody() {

    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const rawData = await ServerHandler.GetAllMsg();
        const msgs = await rawData.json();
        setMessages(msgs);
    }

    return (
        <div className='Generic-body'>
            <Paper elevation={3}>
                <div className='msgBorder'>
                    <h2>Messages</h2>
                    <UserMsg />
                    <div className='Seperator-line'>
                        <Box
                            sx={{
                                width: 500,
                                height: 5,
                                backgroundColor: 'primary.main'
                            }}
                        />
                    </div>
                    {messages.map(message =>
                    (
                        <MsgComponent msg={message} key={message.id} />
                    )).reverse()}
                </div>
            </Paper>
        </div>

    )
}

export default MainBody;