import { Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ServerHandler from '../server/serverHandler';

function UserDetails() {
    let params = useParams();
    let userId = parseInt(params.id, 10);
    useEffect(() => {
        fetchUser();
    }, []);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const fetchUser = async () => {
        const rawData = await ServerHandler.GetUserDetails({ userId });
        const user = await rawData.json();
        setUsername(user.username);
        setName(user.name);
    }

    return (
        <div className='Generic-body'>
            <Paper elevation={3}>
                <div className='UserProfile-body'>
                    <h2>User information</h2>
                    <Paper elevation={3}>
                        <div className='UserDetail-TextViews'>
                            <TextField id="user-username"
                                disabled
                                value={username}
                                label="Username"
                                variant="outlined"
                            />
                            <TextField className='TextField-UserDetail'
                                disabled
                                id="user-name"
                                value={name}
                                label="Name"
                                variant="outlined"
                            />
                        </div>
                    </Paper>
                </div >
            </Paper >
        </div >
    )
}

export default UserDetails;