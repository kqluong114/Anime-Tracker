import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "./styles/App.css"
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import MenuBar from './components/MenuBar.jsx';
import Home from './pages/HomePage.jsx';
import Anime from './pages/AnimePage.jsx';
import NotFound from './pages/NotFoundPage.jsx';
import AnimeSearch from './pages/AnimeSearchPage.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, 
        element: <Home /> 
      },
      {
        path: "anime/:animeId",
        element: <Anime />,
      },
      {
        path: "animeSearch/",
        element: <AnimeSearch />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
