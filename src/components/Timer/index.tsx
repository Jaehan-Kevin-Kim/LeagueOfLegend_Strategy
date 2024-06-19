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
import { ALERT_TIMES_MESSAGES, ALERTS } from "../../constants";
import FlashingDialog from "../FlashingDialog";
import { useOptionStore } from "../../store/OptionStore";
import { Languages } from "../../models/Options";

interface AlertRefs {
  [key: string]: HTMLAudioElement;
}

const TimerComponent = () => {
  const optionState = useOptionStore((state) => state);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [messageAudio, setMessageAudio] = useState("");
  const [alertAudioQueue, setAlertAudioQueue] = useState<HTMLAudioElement[]>(
    [],
  );
  const [isAlertPlaying, setIsAlertPlaying] = useState(false);

  const alertRefs = useRef<AlertRefs>(
    ALERTS.reduce<AlertRefs>((acc, alert) => {
      acc[alert.key] = new Audio(
        optionState.options.language === Languages.EN
          ? alert.audio_en
          : alert.audio_kr,
      );
      return acc;
    }, {}),
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      interval && clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, isActive]);

  useEffect(() => {
    // let interval: NodeJS.Timeout | null = null;
    // if (isActive) {
    //   interval = setInterval(() => {
    //     setSeconds((seconds) => seconds + 1);
    //   }, 1000);
    // } else if (!isActive && seconds !== 0) {
    //   interval && clearInterval(interval);
    // }
    console.log("call");

    ALERT_TIMES_MESSAGES.forEach((timeAndMessage) => {
      if (timeAndMessage.seconds === seconds) {
        console.log("call display");
        setShowWarnings(true);
        setAlertMessage(timeAndMessage.message_kr);
        setMessageAudio(timeAndMessage.audio);
      }
    });

    handleAlerts(seconds);

    if (optionState.options.muteAll) {
      // alertAudioQueue.forEach((audio)=>{
      //   audio.muted=true;
      // })
      setIsAlertPlaying(false);
      setAlertAudioQueue([]);
    }
  }, [seconds, optionState.options.muteAll]);

  useEffect(() => {
    if (alertAudioQueue.length > 0 && !isAlertPlaying) {
      playNextInQueue();
    }
  }, [alertAudioQueue, isAlertPlaying]);

  const playNextInQueue = async () => {
    if (alertAudioQueue.length === 0) {
      return;
    }

    setIsAlertPlaying(true);
    const audio = alertAudioQueue[0];
    audio.play();
    audio.onended = () => {
      setAlertAudioQueue((prevQueue) => prevQueue.slice(1));
      setIsAlertPlaying(false);
    };
  };

  const handleAlerts = useCallback(
    (seconds: number) => {
      const newQueue: HTMLAudioElement[] = [];

      optionState.alerts.alerts.forEach((alert) => {
        if (
          seconds === alert.startSeconds ||
          (alert.active &&
            seconds >= alert.startSeconds &&
            seconds <= alert.endSeconds &&
            (seconds - alert.startSeconds) % alert.periodSeconds === 0)
        ) {
          // currentAudio.play();
          const currentAudio = alertRefs.current[alert.key];

          if (currentAudio) {
            newQueue.push(currentAudio);
          }
          // currentAudio.play();
        }
      });
      if (newQueue.length > 0) {
        setAlertAudioQueue((prevQueue) => [...prevQueue, ...newQueue]);
      }
    },
    [seconds, optionState.alerts.alerts],
  );

  const onClickTimerButton = useCallback(() => {
    setIsActive(!isActive);
    setIsStarted(true);
  }, [isActive, isStarted]);

  const onClickResetButton = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
    setIsStarted(false);
    setAlertAudioQueue([]);
    setIsAlertPlaying(false);
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
    setShowWarnings(false);
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
        open={showWarnings}
        message="Snack bar!"
        autoHideDuration={6000}
        onClose={handleAutoCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="warning" sx={{ width: "800", height: "800" }}>
          <AlertTitle>Warning</AlertTitle>
          This is a warning Alert with a cautious title.
        </Alert>
      </Snackbar> */}
      {showWarnings && (
        <FlashingDialog
          message={alertMessage}
          isActive={showWarnings}
          alertCloseHandle={handleAlertClose}
          messageAudio={messageAudio}
        />
      )}
      {/* <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={showWarnings}
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
