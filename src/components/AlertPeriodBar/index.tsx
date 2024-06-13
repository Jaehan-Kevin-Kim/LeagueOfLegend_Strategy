import { Box, Slider, Typography } from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import { SliderTypes } from "../../models/Options";
import { useOptionStore } from "../../store/OptionStore";

interface Props {
  title: string;
  value: number;
  marks: { value: number; label: string }[];
  type: SliderTypes;
  // onChangeSlider: () => {
  //   event: Event;
  //   newValue: number | number[];
  //   type: SliderTypes;
  // };
}
const AlertPeriodBar: FC<Props> = ({
  title,
  value,
  marks,
  type,
  // onChangeSlider,
}) => {
  const [settingValue, setSettingValue] = useState(value);
  const { updateSliderPeriod } = useOptionStore();

  const onChangeSliderValue = useCallback(
    (event: Event, newValue: number | number[]) => {
      // return onChangeSlider(event, newValue, type);
      const updatedValue = newValue as number;
      setSettingValue(updatedValue);
      updateSliderPeriod(type, updatedValue);
    },

    [updateSliderPeriod],
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 5 }}>
      <Box sx={{ width: 250 }}>
        <Typography sx={{ textAlign: "center" }}>{title} (Sec)</Typography>
        <Slider
          aria-label="Always visible"
          // value={repeatMinimapAlertTime}
          value={settingValue}
          step={null}
          min={marks[0].value}
          max={marks[marks.length - 1].value}
          onChange={onChangeSliderValue}
          marks={marks}
          valueLabelDisplay="auto"></Slider>
      </Box>
    </Box>
  );
};

export default AlertPeriodBar;
