import './App.css';
import { React, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Account/Login"
import UserAsset from "./components/User/UserAsset"
import UserProfile from "./components/Profile/UserProfile"
import Community from "./components/Community/Community"
import Navbar from "./components/Navbar"
import TileEditor from "./components/TileEdit/TileEditor"
import MapEditor from "./components/MapEdit/MapEditor"
import Layout from './components/Layout';

function App() {

  //state variable which keeps track of the authenticated user (decides whether to load user data or go to login screen). Not preserved on refresh (need JSON web tokens).
  //if manually navigate to page without authenticatedUser being set, nothing will render. Same result vice versa.
  const [authenticatedUser, authenticateUser] = useState(null); 

  return (
    <div id='screen'>
      <Routes>
        {!authenticatedUser &&
        <Route path='/' element={<Login authenticateUser = {authenticateUser}/>}/>}
      </Routes>
      <Routes>
        
        <Route element={<Layout authenticateUser = {authenticateUser}/>}>
          <Route path='/userAsset' element={<UserAsset authenticatedUser = {authenticatedUser}/>}/>
          <Route path='/userProfile' element={<UserProfile authenticatedUser = {authenticatedUser}/>}/>
          <Route path='/community' element={<Community authenticatedUser = {authenticatedUser}/>}/>
          <Route path='/tileEditor' element={<TileEditor authenticatedUser = {authenticatedUser}/>}/>
          <Route path='/mapEditor' element={<MapEditor authenticatedUser = {authenticatedUser}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
