import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
// import './pages/strategy'
import Strategy from "./pages/Strategy/index";
import { useEffect } from "react";
import { useVersionStore } from "./store/VersionStore";

const App = () => {
  // const { latestVersion, getLatestVersion } = useVersionStore();
  const getLatestVersion = useVersionStore((state) => state.getLatestVersion);

  useEffect(() => {
    getLatestVersion();
  }, [getLatestVersion]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/strategy" />}></Route>
        <Route path="/strategy" element={<Strategy />} />
        {/* <div className="App dark:bg-slate-800">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Hello World</h1>
      </div> */}
      </Routes>
    </Router>
  );
};

// RGAPI-92285206-5125-4eab-a32a-cb46b1b3f91a

export default App;
