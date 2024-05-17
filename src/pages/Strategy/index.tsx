import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
// import Champion from "../components/Champion";
import SelectChampion from "../../components/SelectChampion";
// import SelectChampion from "../../SelectChampion";
import ChampionInfo from "../../components/ChampionInfo";
import { IChampion } from "../../models/Champion";
import { useGetChampionInfo } from "../../store/ChampionStore";
import useChampionStoreHook from "../../hooks/useChampionStoreHook";
import ChampionCard from "../../components/ChampionCard";
// import { Button } from "@headlessui/react";
import useSummonerSpellStoreHook from "../../hooks/useSummonerSpellStoreHook";
import SummonerSpells from "../../components/SummonerSpells/index";
import NavigationTabs from "../../components/NavigationTabs";

const positions = ["TOP", "JG", "MID", "ADC", "SUPP"];

export interface TeamChampInfo {
  team: string;
  champion: IChampion | null;
  position: string;
}

const Strategy = () => {
  //   const { data, loading, error } = useGetChampionInfo();
  const { showSkillDetails, changeShowSkillDetails } = useGetChampionInfo();
  const executeGetChampionsWithVersion = useChampionStoreHook();
  //   const [myTeamChampsInfo, setMyTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  //   const [opponentTeamChampsInfo, setOpponentTeamChampsInfo] = useState<
  //     TeamChampInfo[]
  //   >([]);
  const getSummonerSpellsWithVersion = useSummonerSpellStoreHook();
  const [teamChampsInfo, setTeamChampsInfo] = useState<TeamChampInfo[]>([]);
  const [spellDetailSwitchChecked, setSpellDetailSwitchChecked] =
    useState(false);

  const [showSelectChampion, setShowSelectChampion] = useState(false);

  //   const getChampionInfo = useGetChampionInfo();

  useEffect(() => {
    executeGetChampionsWithVersion();
    getSummonerSpellsWithVersion();
    const initialChampsInfo = positions.flatMap((position) => [
      { team: "MyTeam", champion: null, position },
      { team: "Opponent", champion: null, position },
    ]);
    setTeamChampsInfo(initialChampsInfo);

    // console.log("showSkillDetails in useEffect", showSkillDetails);

    // console.log("initialChampsInfo: ", initialChampsInfo);
  }, [executeGetChampionsWithVersion, getSummonerSpellsWithVersion]);

  const handleSelectedChampion = useCallback(
    (team: string, champion: IChampion, position: string) => {
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

  const onChangeSpellDetailSwitch = useCallback(() => {
    // setSpellDetailSwitchChecked(!spellDetailSwitchChecked);
    // console.log("showSkillDetails: ", showSkillDetails);

    changeShowSkillDetails(!showSkillDetails);
  }, [changeShowSkillDetails, showSkillDetails]);

  return (
    <>
      <Grid container spacing={1} sx={{ p: 1 }}>
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={11}>
            {/* temporarily comment out below spell information
            <SummonerSpells></SummonerSpells>
             */}
          </Grid>
          <Grid item xs={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={showSkillDetails}
                    onChange={onChangeSpellDetailSwitch}
                  />
                }
                labelPlacement="top"
                label="Spell Detail"></FormControlLabel>
            </FormGroup>
          </Grid>
        </Grid>

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
    </>
  );
};

export default Strategy;
