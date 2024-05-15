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

  useEffect(() => {
    console.log("teamChampsInfo updated:", teamChampsInfo);
  }, [teamChampsInfo]);

  //   const assignInitialMyTeamChampsInfo = useCallback(() => {
  //     const myTeamMap = positions.map((position) => ({
  //       team: "MyTeam",
  //       champion: null,
  //       position: position,
  //     }));
  //     setMyTeamChampsInfo(myTeamMap);
  //   }, []);

  //   const assignInitialOpponentTeamChampsInfo = useCallback(() => {
  //     const opponentTeamMap = positions.map((position) => ({
  //       team: "Opponent",
  //       champion: null,
  //       position: position,
  //     }));
  //     setOpponentTeamChampsInfo(opponentTeamMap);
  //   }, []);

  //   const onTopChampSelectButtonClick = () => {
  //     console.log("clicked");
  //     // return <SelectChampion />;
  //     setShowSelectChampion(true);
  //   };

  const handleSelectedChampion = useCallback(
    (team: string, champion: Champion, position: string) => {
      console.log("champion in Parent Component", champion);
      // setChampInfo(champion);

      // if (team === "MyTeam") {
      const updateTeamChampInfo = teamChampsInfo.map((info) =>
        info.position === position && info.team === team
          ? { ...info, champion }
          : info,
      );

      console.log("updateTeamChampInfo: ", updateTeamChampInfo);
      setTeamChampsInfo(updateTeamChampInfo);
      console.log("teamChampsInfo: ", teamChampsInfo);

      // }

      // if (team === "Opponent") {
      //   const updateTeamChampInfo = opponentTeamChampsInfo.map((info) =>
      //     info.position === position && info.team === team
      //       ? { ...info, champion }
      //       : info,
      //   );
      //   setOpponentTeamChampsInfo(updateTeamChampInfo);
      // }
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
          {/* <Card sx={{ border: "none", boxShadow: "none" }}>
            <CardContent>
              <Typography variant="h6">{info.position}</Typography>
              <Button
                onClick={() => setShowSelectChampion(true)}
                variant="contained"
                style={{ maxWidth: "250px", maxHeight: "50px" }}>
                Select Champion
              </Button>
              {showSelectChampion && (
                <SelectChampion
                  onClose={() => setShowSelectChampion(false)}
                  onSelectChampion={(team, champion, position) =>
                    handleSelectedChampion(team, champion, position)
                  }
                  champions={data}
                  position={info.position}
                  team={info.team}
                />
              )}
            </CardContent>
          </Card> */}
        </Grid>
      ))}
    </Grid>
    // <>
    //   {loading ? (
    //     <h1>Loading for getting all champion info...</h1>
    //   ) : (
    //     data && (
    //       <Grid container spacing={1} sx={{ p: 1 }}>
    //         <Grid item xs={6}>
    //           <h3>My Team</h3>
    //           {myTeamChampsInfo.map((champInfo) => (
    //             <Card sx={{ border: "none", boxShadow: "none" }}>
    //               <CardContent>
    //                 <Typography variant="h6" sx={{ paddingBottom: 1 }}>
    //                   {champInfo.position}
    //                 </Typography>
    //                 {!!champInfo.champion ? (
    //                   <ChampionInfo
    //                     championId={champInfo.champion.id}
    //                     versionNumber={champInfo.champion.version}
    //                   />
    //                 ) : (
    //                   <Button
    //                     onClick={onTopChampSelectButtonClick}
    //                     variant="contained"
    //                     style={{ maxWidth: "250px", maxHeight: "50px" }}>
    //                     Select Champion
    //                   </Button>
    //                 )}
    //                 {showSelectChampion && (
    //                   <SelectChampion
    //                     onClose={() => setShowSelectChampion(false)}
    //                     onSelectChampion={handleSelectedChampion}
    //                     champions={data}
    //                     team={champInfo.team}
    //                     position={champInfo.position}
    //                   />
    //                 )}
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </Grid>

    //         <Grid item xs={6}>
    //           <h3>Opponent</h3>

    //           {opponentTeamChampsInfo.map((champInfo) => (
    //             <Card sx={{ border: "none", boxShadow: "none" }}>
    //               <CardContent>
    //                 <Typography variant="h6" sx={{ paddingBottom: 1 }}>
    //                   {champInfo.position}
    //                 </Typography>
    //                 {!!champInfo.champion ? (
    //                   <ChampionInfo
    //                     championId={champInfo.champion.id}
    //                     versionNumber={champInfo.champion.version}
    //                   />
    //                 ) : (
    //                   <Button
    //                     onClick={onTopChampSelectButtonClick}
    //                     variant="contained"
    //                     style={{ maxWidth: "250px", maxHeight: "50px" }}>
    //                     Select Champion
    //                   </Button>
    //                 )}
    //                 {showSelectChampion && (
    //                   <SelectChampion
    //                     onClose={() => setShowSelectChampion(false)}
    //                     onSelectChampion={handleSelectedChampion}
    //                     champions={data}
    //                     team={champInfo.team}
    //                     position={champInfo.position}
    //                   />
    //                 )}
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </Grid>
    //       </Grid>
    //     )
    //   )}
    // </>
  );
};

export default Strategy;
