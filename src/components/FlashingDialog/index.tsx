import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { useOptionStore } from "../../store/OptionStore";

interface Props {
  message: string;
  isActive: boolean;
  alertCloseHandle: () => void;
  messageAudio: string;
}
const FlashingDialog: FC<Props> = ({
  message,
  isActive,
  alertCloseHandle,
  messageAudio,
}) => {
  const { alarmSound } = useOptionStore((state) => state.options);

  const [color, setColor] = useState("yellow");
  const [seconds, setSeconds] = useState(0);
  const [audioVolume, setVolume] = useState(0.05);
  const alarmAudioRef = useRef(new Audio("/sounds/alarm-sound.mp3"));
  const messageAudioRef = useRef(new Audio(messageAudio));

  useEffect(() => {
    // console.log("isIsActive in FlashingDialog: ", isIsActive);
    console.log("isActive in Flashing Dialog: ", isActive);

    const interval = setInterval(() => {
      setColor((prevColor) => (prevColor === "yellow" ? "red" : "yellow"));
      setSeconds((prevSeconds) => prevSeconds + 0.5);
    }, 500);

    if (alarmSound) {
      alarmAudioRef.current.play();
      alarmAudioRef.current.volume = audioVolume;
    }

    if (seconds >= 2 && alarmSound) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
      messageAudioRef.current.play();
      messageAudioRef.current.volume = 1;
    }

    if (seconds >= 8 && alarmSound) {
      messageAudioRef.current.pause();
      messageAudioRef.current.currentTime = 0;
    }

    if (seconds >= 10) {
      clearInterval(interval);

      //   setIsIsActive(false);
      onCloseDialog();
    }

    return () => clearInterval(interval);
  }, [seconds, color, isActive]);

  const onCloseDialog = () => {
    console.log("close dialog call");
    alertCloseHandle();

    return;
  };

  const onClickMuteButton = () => {
    setVolume(0);
    // alarmAudioRef.current.volume = 0;
  };

  return (
    // <>
    //   {isIsActive && (
    <Dialog
      // fullWidth={fullWidth}
      // maxWidth={maxWidth}
      open={isActive}
      //   sx={{ backgroundColor: "black" }}
      PaperProps={{
        style: { backgroundColor: color, width: "50%", height: "50%" }, // Khaki background color
      }}
      // onClose={handleClose}
    >
      <DialogTitle>정글 Warning</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}

        //   sx={{ backgroundColor: "red" }}
      >
        {/* <DialogContentText
          sx={{ fontWeight: 600, fontSize: "2rem", marginBottom: 5 }}>
          {message}
        </DialogContentText> */}
        <Typography
          sx={{ width: "100%" }}
          variant="h4"
          component="div"
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        />
        <IconButton
          sx={{
            // fontSize: "4rem",
            marginTop: 5,
            "& .MuiSvgIcon-root": {
              // MUI 아이콘에 스타일 적용
              fontSize: "4rem", // 아이콘 크기 조정
            },
          }}
          aria-label="mute"
          onClick={onClickMuteButton}
          size="large">
          <NotificationsOffIcon
          //   sx={{ fontsize: "4rem" }}
          />
        </IconButton>
      </DialogContent>
    </Dialog>
    //   )
    // }
    // </>
  );
};

export default FlashingDialog;
