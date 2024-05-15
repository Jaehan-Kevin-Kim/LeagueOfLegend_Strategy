import React, { FC, useCallback, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Champion } from "../../models/Champion";
import { TeamChampInfo } from "../../pages/Strategy";
import SelectChampion from "../SelectChampion";
import ChampionInfo from "../ChampionInfo";

interface Props {
  onClose: () => void;
  onSelectChampion: (
    team: string,
    champion: Champion,
    position: string,
  ) => void;
  //   champions: Champion[];
  //   team: string;
  //   position: string;
  teamChampInfo: TeamChampInfo;
}

const ChampionCard: FC<Props> = ({
  onSelectChampion,
  onClose,
  teamChampInfo,
}) => {
  const [showSelectChampion, setShowSelectChampion] = useState(false);

  const handleSelectedChampion = useCallback(
    (team: string, champion: Champion, position: string) => {
      onSelectChampion(team, champion, position);
      onClose();

      // if (team === "Opponent") {
      //   const updateTeamChampInfo = opponentTeamChampsTeamChampInfo.map((info) =>
      //     teamChampInfo.position === position && teamChampInfo.team === team
      //       ? { ...info, champion }
      //       : info,
      //   );
      //   setOpponentTeamChampsInfo(updateTeamChampInfo);
      // }
    },
    [onClose, onSelectChampion],
  );

  return (
    <Card sx={{ border: "none", boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h6">{teamChampInfo.position}</Typography>
        {!!teamChampInfo.champion ? (
          <ChampionInfo
            championId={teamChampInfo.champion.id}
            versionNumber={teamChampInfo.champion.version}
          />
        ) : (
          <Button
            onClick={() => setShowSelectChampion(true)}
            variant="outlined"
            style={{ maxWidth: "250px", maxHeight: "50px" }}>
            Select Champion
          </Button>
        )}
        {showSelectChampion && (
          <SelectChampion
            onClose={() => setShowSelectChampion(false)}
            onSelectChampion={(team, champion, position) =>
              handleSelectedChampion(team, champion, position)
            }
            // champions={data}
            position={teamChampInfo.position}
            team={teamChampInfo.team}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ChampionCard;
