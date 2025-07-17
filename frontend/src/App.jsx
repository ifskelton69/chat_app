import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/homePage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SignUpPage from './pages/signUpPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import { useAuth } from './store/useAuth.js'
import {Loader} from "lucide-react"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuth;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  if (isCheckingAuth != authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    );
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={ authUser ? <HomePage />:<Navigate to="/login"/>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
