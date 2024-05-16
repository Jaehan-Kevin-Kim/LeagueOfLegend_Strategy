import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { IChampion } from "../../models/Champion";
import { BoxStyle, CardMediaStyle, CardStyle, TypographyStyle } from "./styles";
import useChampionStoreHook from "../../hooks/useChampionStoreHook";
import { useGetChampionInfo } from "../../store/ChampionStore";

interface Props {
  onClose: () => void;
  onSelectChampion: (
    team: string,
    champion: IChampion,
    position: string,
  ) => void;
  // champions: Champion[];
  team: string;
  position: string;
}

const SelectChampion: FC<Props> = ({
  onClose,
  // champions,
  onSelectChampion,
  team,
  position,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredChampions, setFilteredChampions] = useState<IChampion[]>([]);
  const { data, loading, error } = useGetChampionInfo();
  // const executeGetChampionsWithVersion = useChampionStoreHook();

  // const [championName, setChampionName] = useState("");
  useEffect(() => {
    // executeGetChampionsWithVersion();

    console.log("open select champion");
    console.log("champion Info: ", data);
    setFilteredChampions(data);
    // }, [onClose, champions]);
  }, [data]);

  const handleClose = () => {
    console.log("handle close");
    onClose();
  };

  const onChageSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTextValue = e.target.value;
    setSearchText(searchTextValue);

    const filteredChamps = data.filter((champion) => {
      if (
        champion.name.toLowerCase().includes(searchTextValue.toLowerCase()) ||
        champion.id.toLowerCase().includes(searchTextValue.toLowerCase())
      ) {
        return champion;
      }
      return false;
    });
    setFilteredChampions(filteredChamps);
  };

  const onClickChampion = (champion: IChampion) => {
    console.log("champion clicked: ", champion);
    onSelectChampion(team, champion, position);
    onClose();
  };

  return (
    <Modal onClose={handleClose} open>
      <Box sx={BoxStyle}>
        <TextField
          sx={{ pb: 2, width: "100%" }}
          id="outlined-controlled"
          label="Search by Champion Name"
          value={searchText}
          onChange={onChageSearchText}
        />
        <Grid container spacing={2}>
          {filteredChampions.map((champion) => (
            <Grid item key={champion.id} xs={6} sm={4} md={3} lg={2}>
              <Card onClick={() => onClickChampion(champion)} sx={CardStyle}>
                <CardMedia
                  component="img"
                  sx={CardMediaStyle}
                  image={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                />
                <CardContent>
                  <Typography noWrap sx={TypographyStyle} variant="body2">
                    {champion.id}
                  </Typography>
                  <Typography noWrap sx={TypographyStyle} variant="body2">
                    {champion.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default SelectChampion;
