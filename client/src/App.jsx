import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 text-gray-100'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
