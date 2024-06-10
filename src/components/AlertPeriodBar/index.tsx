import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const AlertPeriodBar = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: 250 }}>
        <Typography sx={{ textAlign: "center" }}>
          Minimap Alert Repeat Time (Sec)
        </Typography>
        {/* <Slider
          aria-label="Always visible"
          // value={repeatMinimapAlertTime}
          value={minimapAlertRepeatPeriod}
          step={null}
          min={3}
          max={15}
          onChange={onChangeMinimapAlertRepeatPeriodSlider}
          marks={minimapAlertRepeatTimeMarks}
          valueLabelDisplay="auto"></Slider> */}
      </Box>
    </Box>
  );
};

export default AlertPeriodBar;
