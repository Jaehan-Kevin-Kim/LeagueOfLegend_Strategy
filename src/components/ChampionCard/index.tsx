import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { IChampion } from "../../models/Champion";
import { TeamChampInfo } from "../../pages/Strategy";
import ChampionInfo from "../ChampionInfo";
import SelectChampion from "../SelectChampion";
import { Edit } from "@mui/icons-material";

interface Props {
  onClose: () => void;
  onSelectChampion: (
    team: string,
    champion: IChampion,
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
    (team: string, champion: IChampion, position: string) => {
      onSelectChampion(team, champion, position);
      onClose();
    },
    [onClose, onSelectChampion],
  );

  return (
    <Card sx={{ border: "none", boxShadow: "none" }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6">{teamChampInfo.position}</Typography>
          </Grid>
          {!!teamChampInfo.champion && (
            <Grid item>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setShowSelectChampion(true)}
                // variant="outlined"
                // style={{ maxWidth: "250px" }}
                sx={{ ml: 1 }}>
                <Edit />
              </IconButton>
            </Grid>
          )}
        </Grid>
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
