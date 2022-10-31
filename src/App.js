import './App.css';
import React from 'react';
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
  return (
    <div id='screen'>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/userAsset' element={<UserAsset />}/>
          <Route path='/userProfile' element={<UserProfile />}/>
          <Route path='/community' element={<Community />}/>
          <Route path='/tileEditor' element={<TileEditor />}/>
          <Route path='/mapEditor' element={<MapEditor />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
