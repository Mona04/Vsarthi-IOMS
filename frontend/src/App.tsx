import { useState } from 'react'

import './App.css'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import EditCustomer from './components/EditCustomer'
import Customers from './components/Customers'
import AddCustomer from './components/AddCustomer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Dashboard/>
    <Register/>
    <Login/>
    <EditCustomer/>
    <Customers/>
    <AddCustomer/>
    </>
  )
}

export default App
