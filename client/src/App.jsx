import React, { useContext } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext';


const App = () => {

  const { authUser } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-slate-950 text-slate-100'
          : 'min-h-screen bg-white text-black'
      }
    >

      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> :<Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
      </Routes>
    </div>
  )
}

export default App
