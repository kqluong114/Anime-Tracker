// import MenuBar from "./components/MenuBar3.jsx";
import MenuBar from "./components/MenuBar.jsx";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full bg-[oklch(0.3_0.02_274)] text-white">
        {/* <MenuBar /> */}
        <MenuBar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
