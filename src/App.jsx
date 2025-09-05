import MenuBar from './components/MenuBar.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
}

export default App
