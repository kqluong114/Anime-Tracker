// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import MenuBar from './components/MenuBar.jsx'
import Home from './pages/HomePage.jsx'
import Anime from './pages/AnimePage.jsx'
// import About from './pages/about.jsx'
// import Projects from './pages/projects.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/anime/:id",
    element: <Anime />,
  }
]);

function App() {
  return (
    <Router>
      <RouterProvider router={router}/>
    </Router>
    // <Router>
    //   <MenuBar />
    //   <Routes>
    //     {/* <Route path="/" element={<Navigate to="/home" replace />} />

    //     <Route path="/home" element={<Home />} />
    //     <Route path="/anime/:id" element={<Anime />} /> */}
    //     {/* <Route path="/about" element={<About />} />
    //     <Route path="/projects" element={<Projects />} /> */}
    //   </Routes>
    // </Router>
  );
}

export default App
