import { useState } from 'react'
import Routes from './config/router'
import './App.css'
import Dashboard from 'views/dashboard';

function App() {

  return (
    <>
      <Routes />
      <Dashboard />
    </>
  )
}

export default App
