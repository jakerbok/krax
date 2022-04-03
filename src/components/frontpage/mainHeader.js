import React from 'react';
import * as loginModal from '../user/loginModal';
import * as addUserModal from '../user/addUserModal';
import '../../App.css';
import { useCookies } from 'react-cookie';
import { Box, ButtonGroup, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../img/krax100.png';

export default function Header() {
    const [cookies] = useCookies(['userinfo']);
    if (cookies.userinfo) {
        var username = cookies.userinfo.name;
    } else {
        username = "";
    }

    return (
        <div>
            <div className='Main-header'>
                <Link className='App-link' to="/" style={{ textDecoration: 'none' }}><img src={logo} alt="KRAX" /></Link>
                <Link className='App-link' to="/users" style={{ textDecoration: 'none' }}><h3>Users</h3></Link >
                {
                    cookies.userinfo && cookies.userinfo.username ? (
                        <Link className='App-link' to="/userprofile" key={cookies.userinfo.id} style={{ textDecoration: 'none' }}><h3>{username}</h3></Link>
                    ) : (
                        <h3>{username}</h3>
                    )
                }
                < ButtonGroup >
                    {
                        cookies.userinfo && cookies.userinfo.username ? (
                            <Link className='App-link' to="/" style={{ textDecoration: 'none' }}><loginModal.LogoutButton /></Link >
                        ) : (
                            <loginModal.LoginButton />
                        )
                    }
                    < addUserModal.CreateUserButton />
                </ButtonGroup >
            </div >
            <div className='Main-header-line'>
                <Box
                    sx={{
                        width: 300,
                        height: 10,
                        backgroundColor: 'primary.main'
                    }}
                />
            </div>
        </div>
    );
}
