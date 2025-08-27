import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import MenuBar from './components/menu-bar.jsx'
import Home from './pages/home.jsx'
// import About from './pages/about.jsx'
// import Projects from './pages/projects.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </Router>
  );
}

export default App
