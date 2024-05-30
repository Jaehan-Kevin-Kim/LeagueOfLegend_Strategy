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
import { useOptionStore } from "../../store/OptionStore";

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
  const { showPositions } = useOptionStore((state) => state.options);

  const handleSelectedChampion = useCallback(
    (team: string, champion: IChampion, position: string) => {
      onSelectChampion(team, champion, position);
      onClose();
    },
    [onClose, onSelectChampion],
  );

  const onClickSelectChampion = useCallback(() => {
    setShowSelectChampion(true);
  }, [showSelectChampion]);

  return (
    <Card
      sx={{
        border: "none",
        boxShadow: "none",
        py: 0,
        "& .MuiCardContent-root": {
          paddingBottom: 0,
        },
        "& .MuiCardContent-root:last-child": {
          paddingBottom: "2px",
        },
        "& .MuiPaper-root": {
          marginTop: "1px",
        },
      }}>
      <CardContent sx={{ py: 0 }}>
        <Grid container alignItems="center">
          {showPositions && (
            <Grid item>
              <Typography variant="h6">{teamChampInfo.position}</Typography>
            </Grid>
          )}
          {/* {!!teamChampInfo.champion && (
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
          )} */}
        </Grid>
        {!!teamChampInfo.champion ? (
          <ChampionInfo
            showSelectChampion={onClickSelectChampion}
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
