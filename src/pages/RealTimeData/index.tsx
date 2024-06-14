import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";

const RealTimeData = () => {
  const onClickSearchSummoner = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <Button variant="contained" onClick={onClickSearchSummoner}>
        Submit
      </Button>
    </>
  );
};

export default RealTimeData;
