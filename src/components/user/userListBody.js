import { List, ListItem, ListItemText, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as ServerHandler from '../server/serverHandler';
import { Link } from 'react-router-dom';

function UserListBody() {

    useEffect(() => {
        fetchUsers();
    }, []);

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const rawData = await ServerHandler.GetAllUsers();
        const users = await rawData.json();
        setUsers(users);
    }

    return (
        <div className='Generic-body'>
            <Paper elevation={3}>
                <div className='UserList-body'>
                    <h2>User list</h2>
                    <div className='UserList-ItemBody'>
                        <Paper elevation={3}>
                            <List sx={{ width: '100%', maxWidth: 600, minWidth: 400, bgcolor: 'background.paper' }}>
                                {users.map(user =>
                                (
                                    <Link to={`/users/${user.id}`} key={user.id} style={{ textDecoration: 'none' }} className={'App-link'}>
                                        <ListItem button divider>
                                            <ListItemText primary={user.name} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Paper>
                    </div>
                </div>
            </Paper>
        </div >
    )
}

export default UserListBody;