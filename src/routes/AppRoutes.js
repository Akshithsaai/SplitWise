import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/login'
import PrivateRoutes from './PrivateRoutes'
import SignUp from '../components/signUp'
import Dashboard from '../components/dashboard'

function AppRoutes() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes