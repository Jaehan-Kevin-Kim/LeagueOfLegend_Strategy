var express = require("express");
var cors = require("cors");
const axios = require("axios");

var app = express();

app.use(cors());

const API_KEY = "RGAPI-dd0b013e-3ab3-44fb-a675-87dd622ca1a9";

function getPlayerUUID(playerName) {
  return axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}/?api_key=${API_KEY}`,
    )
    .then((response) => {
      console.log(response.data);
      return response.data.puuid;
    })
    .catch((err) => err);

  // (ACCOUNT-V1) https://developer.riotgames.com/apis#account-v1/GET_getByRiotId - Utilize the endpoint /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine} to obtain the PUUID associated with a given account by Riot ID (gameName + tagLine).
  // (SUMMONER-V4) https://developer.riotgames.com/apis#summoner-v4/GET_getByPUUID - Access the endpoint /lol/summoner/v4/summoners/by-puuid/{encryptedPUUID} to retrieve summoner data by PUUID, including summonerID.
}

// GET past5games
// GET localhost:4000/past5Games
app.get("/past5Games", async (req, res, next) => {
  const playerName = "vlotz";

  const PUUID = await getPlayerUUID(playerName);
  const API_CALL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key/${API_KEY}`;
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
}); // localhost:4000
