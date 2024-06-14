import { Tab, Tabs } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location]);

  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, url: string) => {
      console.log("event: ", event);
      console.log("url: ", url);
      setSelectedTab(url);
      navigate(url);
    },
    [navigate],
  );

  return (
    <Tabs
      onChange={handleTabChange}
      aria-label="navigation tabs"
      value={selectedTab}>
      <Tab label="Strategy" value="/strategy" />
      {/* <Tab label="Two" value="/two" /> */}
      <Tab label="Home" value="/home" />
      <Tab label="Data" value="/real-time-data" />
    </Tabs>
  );
};

export default NavigationTabs;
