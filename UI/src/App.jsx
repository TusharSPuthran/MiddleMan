import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Home from './pages/home';
import Profile from './pages/Profile';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
