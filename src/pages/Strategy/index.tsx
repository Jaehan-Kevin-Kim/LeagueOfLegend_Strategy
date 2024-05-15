import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
// import Champion from "../components/Champion";
import SelectChampion from "../../components/SelectChampion";
// import SelectChampion from "../../SelectChampion";
import ChampionInfo from "../../components/ChampionInfo";
import { Champion } from "../../models/Champion";
import { useGetChampionInfo } from "../../store/ChampionStore";
import useChampionStoreHook from "../../hooks/useChampionStoreHook";
import ChampionCard from "../../components/ChampionCard";
// import { Button } from "@headlessui/react";

const positions = ["TOP", "JG", "MID", "ADC", "SUPP"];

export interface TeamChampInfo {
  team: string;
  champion: Champion | null;
  position: string;
}

const Strategy = () => {
  //   const { data, loading, error } = useGetChampionInfo();
  const executeGetChampionsWithVersion = useChampionStoreHook();
  //   const [myTeamChampsInfo, setMyTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  //   const [opponentTeamChampsInfo, setOpponentTeamChampsInfo] = useState<
  //     TeamChampInfo[]
  //   >([]);
  const [teamChampsInfo, setTeamChampsInfo] = useState<TeamChampInfo[]>([]);

  const [showSelectChampion, setShowSelectChampion] = useState(false);

  //   const getChampionInfo = useGetChampionInfo();

  useEffect(() => {
    executeGetChampionsWithVersion();
    const initialChampsInfo = positions.flatMap((position) => [
      { team: "MyTeam", champion: null, position },
      { team: "Opponent", champion: null, position },
    ]);
    setTeamChampsInfo(initialChampsInfo);

    console.log("initialChampsInfo: ", initialChampsInfo);
  }, [executeGetChampionsWithVersion]);

  const handleSelectedChampion = useCallback(
    (team: string, champion: Champion, position: string) => {
      console.log("champion in Parent Component", champion);
      const updateTeamChampInfo = teamChampsInfo.map((info) =>
        info.position === position && info.team === team
          ? { ...info, champion }
          : info,
      );

      setTeamChampsInfo(updateTeamChampInfo);
    },
    [teamChampsInfo],
  );

  return (
    <Grid container spacing={1} sx={{ p: 1 }}>
      {teamChampsInfo.map((info, index) => (
        <Grid item xs={6} key={index}>
          {index === 0 && <h3>My Team</h3>}
          {index === 1 && <h3>Opponent</h3>}
          <ChampionCard
            onClose={() => setShowSelectChampion(false)}
            onSelectChampion={(team, champion, position) =>
              handleSelectedChampion(team, champion, position)
            }
            teamChampInfo={info}></ChampionCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Strategy;
