import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALERT_TIMES_MESSAGES } from "../../constants";
import FlashingDialog from "../FlashingDialog";
import { useOptionStore } from "../../store/OptionStore";

const TimerComponent = () => {
  const optionState = useOptionStore((state) => state);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const beepAudioRef = useRef(new Audio("/sounds/beep-sound.wav"));
  const minimapCheckAudioRef = useRef(new Audio("/sounds/minimap.mp3"));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      interval && clearInterval(interval);
    }

    ALERT_TIMES_MESSAGES.forEach((timeAndMessage) => {
      if (timeAndMessage.seconds === seconds) {
        console.log("call display");
        setShowAlert(true);
        setAlertMessage(timeAndMessage.message);
      }
    });

    if (
      seconds >= 120 &&
      optionState.options.minimapAlertSound &&
      seconds % optionState.minimapAlertRepeatPeriod === 0
    ) {
      beepAudioRef.current.play();
      beepAudioRef.current.volume = 0.07;
      beepAudioRef.current.currentTime = 0;
      minimapCheckAudioRef.current.play();
      minimapCheckAudioRef.current.volume = 1;
      minimapCheckAudioRef.current.currentTime = 0;
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, optionState.minimapAlertRepeatPeriod]);

  const onClickTimerButton = useCallback(() => {
    setIsActive(!isActive);
    setIsStarted(true);
  }, [isActive, isStarted]);

  const onClickResetButton = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
    setIsStarted(false);
  }, [isActive, isStarted, seconds]);

  const formatTimer = useCallback(() => {
    const minutes = Math.floor(seconds / 60).toString();
    const remainingSeconds = (seconds % 60).toString();
    const formattedTime = `${minutes.padStart(
      2,
      "0",
    )}:${remainingSeconds.padStart(2, "0")}`;

    return formattedTime;
  }, [seconds]);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const onClickPlusOneSecond = useCallback(() => {
    setSeconds((prev) => prev + 1);
  }, [seconds]);
  const onClickMinusOneSecond = useCallback(() => {
    setSeconds((prev) => prev - 1);
  }, [seconds]);

  const onClickPlusTenSeconds = useCallback(() => {
    setSeconds((prev) => prev + 10);
  }, [seconds]);
  const onClickMinusTenSeconds = useCallback(() => {
    setSeconds((prev) => prev - 10);
  }, [seconds]);

  return (
    <div>
      {/* <Snackbar
        open={showAlert}
        message="Snack bar!"
        autoHideDuration={6000}
        onClose={handleAutoCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="warning" sx={{ width: "800", height: "800" }}>
          <AlertTitle>Warning</AlertTitle>
          This is a warning Alert with a cautious title.
        </Alert>
      </Snackbar> */}
      {showAlert && (
        <FlashingDialog
          message={alertMessage}
          isActive={showAlert}
          alertCloseHandle={handleAlertClose}
        />
      )}
      {/* <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={showAlert}
        // onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
      {isStarted ? (
        <Box display="flex" alignItems="center">
          <ButtonGroup variant="contained">
            <ButtonGroup
              variant="contained"
              // variant="outlined"
              orientation="vertical"
              size="small"
              aria-label="Timer change 10 seconds">
              <IconButton
                size="small"
                aria-label="plus-ten"
                onClick={onClickPlusTenSeconds}>
                <AddIcon />
                10
              </IconButton>
              <IconButton
                size="small"
                aria-label="minus-ten"
                onClick={onClickMinusTenSeconds}>
                <RemoveIcon />
                10
              </IconButton>
              {/* <Button
                size="small"
                aria-label="plus-ten"
                onClick={onClickPlusTenSeconds}
                startIcon={<AddIcon />}>
                10
              </Button>
              <Button
                size="small"
                aria-label="minus-ten"
                onClick={onClickMinusTenSeconds}
                startIcon={<RemoveIcon />}>
                10
              </Button> */}
            </ButtonGroup>
            <ButtonGroup
              variant="contained"
              // variant="outlined"
              orientation="vertical"
              size="small"
              aria-label="Timer change second">
              <IconButton
                size="small"
                aria-label="plus-one"
                onClick={onClickPlusOneSecond}>
                <AddIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="minus-one"
                onClick={onClickMinusOneSecond}>
                <RemoveIcon />
              </IconButton>
            </ButtonGroup>
          </ButtonGroup>

          <Button onClick={onClickTimerButton} variant="contained">
            Pause
          </Button>
          <Typography mr={1} ml={1} variant="h4" sx={{ color: "red" }}>
            {formatTimer()}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={onClickResetButton}>
            Reset
          </Button>
          {/* <ButtonGroup
            orientation="vertical"
            size="small"
            aria-label="Timer button group">
          </ButtonGroup> */}
        </Box>
      ) : (
        <Button
          size="large"
          variant="contained"
          //   sx={{ background: "red", width: "400" }}
          color="error"
          onClick={onClickTimerButton}>
          Start
        </Button>
      )}
    </div>
  );
};

export default TimerComponent;
