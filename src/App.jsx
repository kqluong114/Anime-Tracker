// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import MenuBar from './components/menu-bar.jsx'
import Home from './pages/home.jsx'
import Anime from './pages/anime.jsx'
// import About from './pages/about.jsx'
// import Projects from './pages/projects.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </Router>
  );
}

export default App
