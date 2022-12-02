import './App.css';
import { React, useState, useEffect} from 'react';
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
  const [authenticatedUser, authenticateUser] = useState({id: "-1"}); 
  const [tileset, editTile] = useState("");
  const [map, editMap] = useState("");

  let transactionStack = new TPS(); //transaction stack used for undo/redo

  return (
    <div id='screen'>
      <Routes>
        {<Route path='/' element={<Login authenticateUser = {authenticateUser}/>}/>}
      </Routes>
      <Routes>  
        <Route element={<Layout authenticateUser = {authenticateUser} user={authenticatedUser}/>}>
          <Route path='/userAsset/:id' element={<UserAsset authenticatedUser = {authenticatedUser} editTile = {editTile} editMap={editMap} authenticateUser = {authenticateUser}/> }/>
          <Route path='/userProfile/:id' element={<UserProfile authenticatedUser = {authenticatedUser} authenticateUser = {authenticateUser}/>}/>
          <Route path='/community/:id' element={<Community authenticatedUser = {authenticatedUser} authenticateUser = {authenticateUser}/>}/>
          <Route path='/tileEditor/:id/:assetid' element={<TileEditor authenticatedUser = {authenticatedUser} tileset={tileset} authenticateUser = {authenticateUser} editTile={editTile}/>}/>
          <Route path='/mapEditor/:id/:assetid' element={<MapEditor map={map} authenticatedUser = {authenticatedUser} transactionStack = {transactionStack} authenticateUser = {authenticateUser} editMap={editMap}/>}/>
        </Route>
        <Route path='/resetpassword/:id/:token' element={<PasswordResetScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
