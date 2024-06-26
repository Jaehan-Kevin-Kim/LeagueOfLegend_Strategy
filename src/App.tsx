import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
// import './pages/strategy'
import { Box } from "@mui/system";
import { useEffect } from "react";
import NavigationTabs from "./components/NavigationTabs";
import SettingsComponent from "./components/SettingsComponent";
import Home from "./pages/Home";
import Strategy from "./pages/Strategy/index";
import TimerComponent from "./components/Timer";

import { useVersionStore } from "./store/VersionStore";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useOptionStore } from "./store/OptionStore";
import RealTimeData from "./pages/RealTimeData";

const App = () => {
  // const { latestVersion, getLatestVersion } = useVersionStore();

  const getLatestVersion = useVersionStore((state) => state.getLatestVersion);
  const { darkMode } = useOptionStore((state) => state.options);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    getLatestVersion();
  }, [getLatestVersion]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Container maxWidth="xl"> */}
        {/* <> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          <Box sx={{ flex: 1 }}>
            <NavigationTabs />
          </Box>
          <Box sx={{ flex: 0 }}>
            <TimerComponent />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <SettingsComponent />
          </Box>
          {/* </Box> */}
        </Box>
        <Routes>
          <Route path="/" element={<Navigate to="/strategy" />}></Route>
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/home" element={<Home />} />
          <Route path="/real-time-data" element={<RealTimeData />} />
          {/* <div className="App dark:bg-slate-800">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Hello World</h1>
      </div> */}
        </Routes>
        {/* </Container> */}
        {/* </> */}
      </Router>
    </ThemeProvider>
  );
};

// RGAPI-92285206-5125-4eab-a32a-cb46b1b3f91a

export default App;
