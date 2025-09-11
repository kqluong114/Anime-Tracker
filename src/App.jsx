import MenuBar from './components/MenuBar.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="h-full bg-[oklch(0.3_0.02_274)] text-white">
      <MenuBar />
      <Outlet />
    </div>
  );
}

export default App
