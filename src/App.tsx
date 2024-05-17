import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
// import './pages/strategy'
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import NavigationTabs from "./components/NavigationTabs";
import SettingsComponent from "./components/SettingsComponent";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy/index";
import { useVersionStore } from "./store/VersionStore";

const App = () => {
  // const { latestVersion, getLatestVersion } = useVersionStore();

  const getLatestVersion = useVersionStore((state) => state.getLatestVersion);

  useEffect(() => {
    getLatestVersion();
  }, [getLatestVersion]);

  return (
    <Router>
      {/* <Container maxWidth="xl"> */}
      {/* <> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <NavigationTabs />
        <SettingsComponent />
      </Box>
      <Routes>
        <Route path="/" element={<Navigate to="/strategy" />}></Route>
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/home" element={<Home />} />
        {/* <div className="App dark:bg-slate-800">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Hello World</h1>
      </div> */}
      </Routes>
      {/* </Container> */}
      {/* </> */}
    </Router>
  );
};

// RGAPI-92285206-5125-4eab-a32a-cb46b1b3f91a

export default App;
