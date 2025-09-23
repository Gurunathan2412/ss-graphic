
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AdminLogin from './admin/Login'
import AdminDashboard from './admin/Dashboard'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
