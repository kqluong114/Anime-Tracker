import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/HomePage.jsx';
import Anime from './pages/AnimePage.jsx';
import NotFound from './pages/NotFoundPage.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/anime/:id",
    element: <Anime />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <MenuBar /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
