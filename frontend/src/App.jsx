import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './comoponents/Home'
import Login from './comoponents/Login'
import Signup from './comoponents/Signup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App