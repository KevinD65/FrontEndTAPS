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
import PasswordResetScreen from './components/Account/PasswordResetScreen';
import { TPS }  from './static/Transaction';

function App() {

  //state variable which keeps track of the authenticated user (decides whether to load user data or go to login screen). Not preserved on refresh (need JSON web tokens).
  //if manually navigate to page without authenticatedUser being set, nothing will render. Same result vice versa.
  const [authenticatedUser, authenticateUser] = useState(null); 
  const [tileset, editTile] = useState("");

  let transactionStack = new TPS(); //transaction stack used for undo/redo

  return (
    <div id='screen'>
      <Routes>
        {!authenticatedUser &&
        <Route path='/' element={<Login authenticateUser = {authenticateUser}/>}/>}
      </Routes>
      <Routes>  
        <Route element={<Layout authenticateUser = {authenticateUser}/>}>
          <Route path='/userAsset' element={<UserAsset authenticatedUser = {authenticatedUser} editTile = {editTile}/>}/>
          <Route path='/userProfile' element={<UserProfile authenticatedUser = {authenticatedUser} authenticateUser = {authenticateUser}/>}/>
          <Route path='/community' element={<Community authenticatedUser = {authenticatedUser}/>}/>
          <Route path='/tileEditor' element={<TileEditor authenticatedUser = {authenticatedUser} tileset={tileset}/>}/>
          <Route path='/mapEditor' element={<MapEditor authenticatedUser = {authenticatedUser} transactionStack = {transactionStack}/>}/>
        </Route>
        //<Route path='/resetpassword/:id/:token' element={<PasswordResetScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
