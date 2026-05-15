import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path="/dash" element={<Dashboard/>} />

          <Route path="/healthIn" element={<Dashboard/>} />
          <Route path="/expenses" element={<Dashboard/>} />
          <Route path="/investments" element={<Dashboard/>} />

          <Route path="/loan" element={<Dashboard/>} />
          <Route path="/sipCalc" element={<Dashboard/>} />
          <Route path="/taxCalc" element={<Dashboard/>} />
          <Route path="/profile" element={<Dashboard/>} />
          <Route path="/logout" element={<Dashboard/>} />



        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
