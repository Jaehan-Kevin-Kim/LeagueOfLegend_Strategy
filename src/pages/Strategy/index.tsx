import { useCallback, useEffect, useState } from "react";

import ChampionCard from "../../components/ChampionCard";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import useChampionStoreHook from "../../hooks/useChampionStoreHook";
import { IChampion, ITeamChampInfo } from "../../models/Champion";
import useSummonerSpellStoreHook from "../../hooks/useSummonerSpellStoreHook";
import { useOptionStore } from "../../store/OptionStore";
import { useGetChampionInfo } from "../../store/ChampionStore";
import SummonerSpells from "../../components/SummonerSpells";
import AlertPeriodBar from "../../components/AlertPeriodBar/index";
import { SliderTypes } from "../../models/Options";

export interface TeamChampInfo {
  team: string;
  champion: IChampion | null;
  position: string;
}

const minimapAlertRepeatTimeMarks = [
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
];

const gameReminderRepeatTimeMarks = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 60,
    label: "60",
  },
];

const Strategy = () => {
  const executeGetChampionsWithVersion = useChampionStoreHook();
  const getSummonerSpellsWithVersion = useSummonerSpellStoreHook();
  const { updateTeamChampsInfo, resetSpecificTeamChampsInfo, teamChampsInfo } =
    useGetChampionInfo();
  const {
    options,
    minimapAlertRepeatPeriod,
    updateMinimapAlertRepeatPeriod,
    gameReminderAlertPeriod,
  } = useOptionStore();
  // const [teamChampsInfo, setTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  const [myTeamChampsInfo, setMyTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  const [opponentTeamChampsInfo, setOpponentTeamChampsInfo] = useState<
    TeamChampInfo[]
  >([]);
  // const [repeatMinimapAlertTime, setRepeatMinimapAlertTime] = useState(
  //   minimapAlertRepeatPeriod,
  // );

  const [showSelectChampion, setShowSelectChampion] = useState(false);

  // useEffect(() => {
  //   setRepeatMinimapAlertTime(minimapAlertRepeatPeriod);
  // }, [minimapAlertRepeatPeriod]);

  useEffect(() => {
    executeGetChampionsWithVersion();
    getSummonerSpellsWithVersion();
  }, [
    executeGetChampionsWithVersion,
    getSummonerSpellsWithVersion,
    // teamChampsInfo,
  ]);

  useEffect(() => {
    console.log("call useEffect changing teamChampsInfo");
    console.log("teamChampsInfo in useeffect", teamChampsInfo);

    occupyTeamChampsInfo(teamChampsInfo);
  }, [teamChampsInfo]);

  const handleSelectedChampion = useCallback(
    (team: string, champion: IChampion, position: string) => {
      updateTeamChampsInfo({ team, champion, position });
    },
    [],
  );

  const occupyTeamChampsInfo = useCallback(
    (teamChampsInfo: ITeamChampInfo[]) => {
      // if (team === "MyTeam") {
      const myTeamChampList = teamChampsInfo.filter(
        (info) => info.team === "MyTeam",
      );
      setMyTeamChampsInfo(myTeamChampList);
      // }

      // if (team === "Opponent") {
      const opponentTeamChampList = teamChampsInfo.filter(
        (info) => info.team === "Opponent",
      );
      setOpponentTeamChampsInfo(opponentTeamChampList);
    },
    [],
  );

  const onClickClearTeam = useCallback(
    (team: string) => () => {
      resetSpecificTeamChampsInfo(team);
      // console.log("clear team: ", team /*  */);
    },
    [],
  );

  const onChangeMinimapAlertRepeatPeriodSlider = useCallback(
    (event: Event, newValue: number | number[]) => {
      // setRepeatMinimapAlertTime(newValue as number);
      updateMinimapAlertRepeatPeriod(newValue as number);
    },
    [updateMinimapAlertRepeatPeriod],
  );

  return (
    <>
      <Grid container spacing={1} sx={{ p: 1 }}>
        {options.showSpells && <SummonerSpells></SummonerSpells>}

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

      {/* <AlertPeriodBar
        title="Minimap Alert Repeat Time"
        value={minimapAlertRepeatPeriod}
        marks={minimapAlertRepeatTimeMarks}
        type={SliderTypes.MinimapAlert}
      />
      <AlertPeriodBar
        title="Game Reminder Repeat Time"
        value={gameReminderAlertPeriod}
        marks={gameReminderRepeatTimeMarks}
        type={SliderTypes.GameReminder}
      /> */}
    </>
  );
};

export default Strategy;
