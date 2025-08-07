

import './App.css'
import {  Route, Routes } from 'react-router'

import Register from './pages/auth/Register'
import LoginPage from './pages/auth/Login'
function App() {
 

  return (
 
      <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage/>} />
      </Routes>
  
  )
}

export default App
