import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import HealthIn from './Pages/HealthIn'
import Expenses from './Pages/Expenses'
import Investment from './Pages/Investment'
import Loan from './Pages/Loan'
import SipCalculator from './Pages/SipCalculator'
import TaxCalculator from './Pages/TaxCalculator'
import Profile from './Pages/Profile'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path="/dash" element={<Dashboard/>} />

          <Route path="/healthIn" element={<HealthIn/> } />
          <Route path="/expenses" element={ <Expenses/> } />
          <Route path="/investments" element={ <Investment/> } />

          <Route path="/loan" element={ <Loan/> } />
          <Route path="/sipCalc" element={ <SipCalculator/> } />
          <Route path="/taxCalc" element={ <TaxCalculator/> } />
          <Route path="/profile" element={ <Profile/> } />
          <Route path="/logout" element={<Dashboard/>} />



        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
