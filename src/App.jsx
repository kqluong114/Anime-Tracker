// import MenuBar from "./components/MenuBar3.jsx";
import MenuBar from "./components/MenuBar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-full w-full bg-[oklch(0.3_0.02_274)] text-white">
      {/* <MenuBar /> */}
      <MenuBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
