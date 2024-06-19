import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert, Languages } from "../../models/Options";
import { useOptionStore } from "../../store/OptionStore";

interface SecondsOptions {
  name: string;
  options: number[];
  defaultValue: number;
}

interface Props {
  alert: Alert;
}
const AlertCard: FC<Props> = ({ alert }) => {
  const { language } = useOptionStore((state) => state.options);
  const { alerts, updateAlert } = useOptionStore((state) => state);
  const [alertName, setAlertName] = useState("");
  const [secondsOptions, setSecondsOptions] = useState<SecondsOptions[]>([]);
  const [checked, setChecked] = useState(alert.active);

  useEffect(() => {
    const alertName = Languages.KR ? alert.name_kr : alert.name_en;
    setAlertName(alertName);
    setSecondsOptions([
      {
        name: "Start",
        options: [...alert.startSecondsOptions],
        defaultValue: alert.startSeconds,
      },
      {
        name: "Repeat",
        options: [...alert.periodSecondsOptions],
        defaultValue: alert.periodSeconds,
      },
      {
        name: "End",
        options: [...alert.endSecondsOptions],
        defaultValue: alert.endSeconds,
      },
    ]);
  }, [language, alertName, secondsOptions]);

  const onClickCardActionArea = useCallback(
    (event: any) => {
      console.log("clicked card action area");
      console.log("event: ", event.target.tagName);
      const updatedAlert = { ...alert, active: !alert.active };

      updateAlert(updatedAlert);

      // 여기서 해당 option update 부분 변경 하기 (on-off 여부 변경 하기)

      //   setChecked(event.target.checked);
    },
    [updateAlert, alert],
  );

  // const onChangeCheckBox = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log("clicked");
  //     setChecked(event.target.checked);
  //   },
  //   [],
  // );

  const onChangeSelectOptions = useCallback(
    (event: SelectChangeEvent, eventName: string) => {
      // event.preventDefault();
      // event.stopPropagation();
      // 여기서 각각 start, repeat, end period time 변경 하기.
      console.log("change selection");
      console.log(event.target.value);
      console.log("eventName: ", eventName);
      let updatedAlert = alert;
      if (eventName === "Start") {
        updatedAlert = { ...updatedAlert, startSeconds: +event.target.value };
      }
      if (eventName === "Repeat") {
        updatedAlert = { ...updatedAlert, periodSeconds: +event.target.value };
      }
      if (eventName === "End") {
        updatedAlert = { ...updatedAlert, endSeconds: +event.target.value };
      }

      updateAlert(updatedAlert);

      // const updatedAlert = {...alert, }
    },
    [updateAlert, alert],
  );

  // const onChangeStartSelect = useCallback((event: SelectChangeEvent) => {
  //   console.log(event.target.value);

  //   console.log("start changed");
  // }, []);

  const convertSecondsToMinutesSeconds = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString();
    // .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }, []);

  return (
    <Card
      sx={{
        border: alert.active ? "2px solid" : "2px solid",
        // boxSizing: "border-box",
        borderColor: alert.active ? "text.secondary" : "transparent",
      }}>
      <CardContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
        }}>
        <CardActionArea onClick={onClickCardActionArea}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, p: 1 }}>
            <Checkbox
              inputProps={{ "aria-label": alertName }}
              checked={alert.active}
              // onChange={onChangeCheckBox}
            ></Checkbox>
            <Typography variant="h6">{alertName}</Typography>
          </Box>
        </CardActionArea>
        <Box sx={{ display: "flex", px: 1, py: 0 }}>
          {secondsOptions.map((options) => (
            <FormControl key={options.name} fullWidth>
              <InputLabel id={`${alert.key}-${options.name}-label`}>
                {options.name}
              </InputLabel>
              <Select
                labelId={`${alert.key}-${options.name}-label`}
                id={alert.key}
                value={options.defaultValue.toString()}
                label={options.name}
                // onChange={onChangeSelectOptions(options.name)}>
                onChange={(event: SelectChangeEvent) => {
                  event.stopPropagation();
                  onChangeSelectOptions(event, options.name);
                }}>
                {options.options.map((option) => (
                  <MenuItem
                    key={`${alert.key}-${options.name}-${option}`}
                    value={option}>
                    {options.name === "Repeat"
                      ? option
                      : convertSecondsToMinutesSeconds(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
