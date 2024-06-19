import { Button, TextField } from "@mui/material";
import React, { useCallback } from "react";
import axios from "axios";

const RealTimeData = () => {
  const onClickSearchSummoner = useCallback(async () => {
    console.log("clicked");

    const platform = "https://na1.api.riotgames.com/";
    const medata = "/riot/account/v1/accounts/me";
    const api = "RGAPI-004c63da-274d-49c9-8c4b-0164f18eee38";

    const url = `${platform}${medata}?api_key=${api}`;

    const result = await axios.get(url);
    console.log("result: ", result);
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
