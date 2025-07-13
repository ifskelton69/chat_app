import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import homePage from './pages/homePage.jsx'
import settingsPage from './pages/settingsPage.jsx'
import loginPage from './pages/loginPage.jsx'
import signUpPage from './pages/signUpPage.jsx'
import profilePage from './pages/profilePage.jsx' 

const App = () => {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path='/'element= {<homePage/>}/>
        <Route path='/signup'element= {<signUpPage />}/>
        <Route path='/login'element= {<loginPage/>}/>
        <Route path='/settings'element= {<settingsPage/>}/>
        <Route path='/profile'element= {<progilePage/>}/>
      </Routes>
    </div>
  )
}

export default App
