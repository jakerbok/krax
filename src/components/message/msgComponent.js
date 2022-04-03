import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ServerHandler from '../server/serverHandler';

const fontColor = {
    style: { color: 'rgb(50, 50, 50)' }
}

function MsgComponent(props) {
    useEffect(() => {
        fetchName();
    }, []);
    const [name, setName] = useState("");

    const fetchName = async () => {
        const userId = props.msg.userId;
        const rawData = await ServerHandler.GetUserDetails({ userId });
        const userDetails = await rawData.json();
        setName(userDetails.name);
    }

    return (
        <div>
            <div className='msgBorder1'>
                <Link to={`/users/${props.msg.userId}`} className={'App-link'} key={props.msg.userId} style={{ textDecoration: 'none' }}>
                    <h3>{name}</h3>
                </Link>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={6}
                    fullWidth
                    value={props.msg.message}
                    disabled={true}
                    inputProps={fontColor}
                />
                {props.msg.timestamp}
            </div>
        </div >
    )
}

export default MsgComponent;