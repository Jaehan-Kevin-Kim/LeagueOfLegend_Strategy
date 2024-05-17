import { useCallback, useEffect, useState } from "react";

import ChampionCard from "../../components/ChampionCard";
import { Button, Grid } from "@mui/material";
import useChampionStoreHook from "../../hooks/useChampionStoreHook";
import { IChampion } from "../../models/Champion";
// import { Button } from "@headlessui/react";
import useSummonerSpellStoreHook from "../../hooks/useSummonerSpellStoreHook";
import { useOptionStore } from "../../store/OptionStore";
import { useGetChampionInfo } from "../../store/ChampionStore";

const positions = ["TOP", "JG", "MID", "ADC", "SUPP"];

export interface TeamChampInfo {
  team: string;
  champion: IChampion | null;
  position: string;
}

const Strategy = () => {
  //   const { data, loading, error } = useGetChampionInfo();
  // const { showSkillDetails, changeShowSkillDetails } = useGetChampionInfo();
  const executeGetChampionsWithVersion = useChampionStoreHook();
  //   const [myTeamChampsInfo, setMyTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  //   const [opponentTeamChampsInfo, setOpponentTeamChampsInfo] = useState<
  //     TeamChampInfo[]
  //   >([]);
  const getSummonerSpellsWithVersion = useSummonerSpellStoreHook();
  const { updateTeamChampsInfo, resetSpecificTeamChampsInfo, teamChampsInfo } =
    useGetChampionInfo();
  const { options } = useOptionStore();
  // const [teamChampsInfo, setTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  const [myTeamChampsInfo, setMyTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  const [opponentTeamChampsInfo, setOpponentTeamChampsInfo] = useState<
    TeamChampInfo[]
  >([]);

  const [showSelectChampion, setShowSelectChampion] = useState(false);

  //   const getChampionInfo = useGetChampionInfo();

  useEffect(() => {
    executeGetChampionsWithVersion();
    getSummonerSpellsWithVersion();
    /*
    const initialChampsInfo = positions.flatMap((position) => [
      { team: "MyTeam", champion: null, position },
      { team: "Opponent", champion: null, position },
    ]);
    setTeamChampsInfo(initialChampsInfo);
    */
    const myTeamChampsInfo = positions.map((position) => ({
      team: "MyTeam",
      champion: null,
      position,
    }));
    const opponentTeamChampsInfo = positions.map((position) => ({
      team: "Opponent",
      champion: null,
      position,
    }));

    setMyTeamChampsInfo(myTeamChampsInfo);
    setOpponentTeamChampsInfo(opponentTeamChampsInfo);
  }, [executeGetChampionsWithVersion, getSummonerSpellsWithVersion]);

  const updateTeamChampInfo = (
    teamChampsInfo: TeamChampInfo[],
    champion: IChampion,
    position: string,
  ): TeamChampInfo[] => {
    const updatedTeamChampInfo = teamChampsInfo.map((info) =>
      info.position === position ? { ...info, champion } : info,
    );

    return updatedTeamChampInfo;
  };

  const handleSelectedChampion = useCallback(
    (team: string, champion: IChampion, position: string) => {
      /*
      // 이거는 store에서 champ information 관리하는 코드임. 화욜에 와서 아래 code comment 풀기
      updateTeamChampsInfo({ team, champion, position });

      if (team === "MyTeam") {
        const myTeamChampList = teamChampsInfo.filter(
          (info) => info.team === team,
        );
        setMyTeamChampsInfo(myTeamChampList);
      }

      if (team === "Opponent") {
        const opponentTeamChampList = teamChampsInfo.filter(
          (info) => info.team === team,
        );
        setOpponentTeamChampsInfo(opponentTeamChampList);
      }

      //
      */

      if (team === "MyTeam") {
        const updatedTeamChampInfo = updateTeamChampInfo(
          myTeamChampsInfo,
          champion,
          position,
        );
        setMyTeamChampsInfo(updatedTeamChampInfo);
      }

      if (team === "Opponent") {
        const updatedTeamChampInfo = updateTeamChampInfo(
          opponentTeamChampsInfo,
          champion,
          position,
        );
        setOpponentTeamChampsInfo(updatedTeamChampInfo);
      }
    },
    [myTeamChampsInfo, opponentTeamChampsInfo, teamChampsInfo],
  );

  const onClickClearTeam = useCallback(
    (team: string) => () => {
      resetSpecificTeamChampsInfo(team);
      // console.log("clear team: ", team /*  */);
    },
    [],
  );

  return (
    <>
      <Grid container spacing={1} sx={{ p: 1 }}>
        {/* temporarily comment out below spell information */}
        {/* <SummonerSpells></SummonerSpells> */}

        {options.showMyTeam && (
          <Grid item xs={options.showOpponent ? 6 : 12}>
            <Grid
              container
              justifyContent="start"
              alignItems="center"
              sx={{ mb: 0, pb: 0, height: 45 }}>
              <Grid item>
                <h3>My Team</h3>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  style={{ marginLeft: 150 }}
                  variant="outlined"
                  onClick={onClickClearTeam("MyTeam")}>
                  Clear
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="column">
              {myTeamChampsInfo.map((info, index) => (
                <Grid item key={index} xs={12}>
                  <ChampionCard
                    onClose={() => setShowSelectChampion(false)}
                    onSelectChampion={(team, champion, position) =>
                      handleSelectedChampion(team, champion, position)
                    }
                    teamChampInfo={info}></ChampionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {options.showOpponent && (
          <Grid item xs={options.showMyTeam ? 6 : 12}>
            <Grid
              container
              justifyContent="start"
              alignItems="center"
              sx={{ mb: 0, pb: 0, height: 45 }}>
              <Grid item>
                <h3>Opponent</h3>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClickClearTeam("Opponent")}
                  size="small"
                  style={{ marginLeft: 150 }}
                  variant="outlined">
                  Clear
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="column">
              {opponentTeamChampsInfo.map((info, index) => (
                <Grid item key={index} xs={12}>
                  <ChampionCard
                    onClose={() => setShowSelectChampion(false)}
                    onSelectChampion={(team, champion, position) =>
                      handleSelectedChampion(team, champion, position)
                    }
                    teamChampInfo={info}></ChampionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Strategy;
