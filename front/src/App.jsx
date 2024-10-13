import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Home  from './pages/Home'
import Detalles from './pages/Detalles';
import AddSport from './components/AddSport';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
      
        <Route path="/*" element={<Navigate replace to="/home" />} />

        <Route path="/home" element={<Home />} />

        <Route path="/add-sport" element={<AddSport />} />

        <Route path="/sports/:id" element={<Detalles />}  /> 
        
      </Routes>
    </>
  )
}

export default App
