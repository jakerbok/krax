import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/frontpage/mainHeader';
import UserListBody from './components/user/userListBody';
import UserDetails from './components/user/userDetails';
import UserProfile from './components/user/userProfile';
import MainBody from './components/frontpage/mainBody';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/users" element={<UserListBody />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;