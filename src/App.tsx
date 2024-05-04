
import { useLocation } from "react-router-dom";
import './App.css';
import SideBar from './components/SideBar';
import AllRoutes from './pages/AllRoutes';
import { useEffect } from "react";

function App() {

  const location = useLocation();
  const currentRoute = location.pathname;
 
  useEffect(()=>{
    window.localStorage.setItem("contacts", "[]")
  }, [])
  return (
    <div className="App">
      <h1 className='z-50 w-full fixed shadow-sm shadow-slate-700 top-0 text-2xl bg-gray-300 font-bold p-4'>
        {
          currentRoute === "/" ? ' Contact Management App' : "Charts and Maps"
        }
      </h1>
      <div className='flex w-full '>
        <div className='sticky  top-0 h-screen w-max'>
          <SideBar />
        </div>
        <div className='w-full'>
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
