import React, { FC, useEffect } from "react";
import { ISummonerSpell } from "../../models/SummonerSpells";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useVersionStore } from "../../store/VersionStore";
import { useOptionStore } from "../../store/OptionStore";

interface Props {
  spell: ISummonerSpell;
}

const SummonerSpellItem: FC<Props> = ({ spell }) => {
  const { testMode } = useOptionStore((state) => state.options);
  const latestVersion = useVersionStore((state) => state.latestVersion);

  //   useEffect(() => {
  //     checkIfSpellContainsClassicMode();
  //   }, [spell]);

  //   if (!spell.modes.includes("CLASSIC")) {
  //     console.log("removed spell: ", spell.name);
  //     return null;
  //   }

  const coolConvertToMinSec = () => {
    const spellCoolInSecond = spell.cooldown[0];
    return (+spellCoolInSecond / 60).toString();
  };

  return (
    <Card sx={{ p: 0, maxHeight: 145 }}>
      {!testMode && (
        <CardMedia
          component="img"
          image={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`}
          sx={{ width: 80, height: 80 }}></CardMedia>
      )}
      <CardContent
        sx={{
          pb: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant="body2">{spell.name}</Typography>
        <Typography variant="body2" sx={{ pb: 0 }}>
          {/* {spell.cooldown[0]}s /  */}
          {coolConvertToMinSec()}m
        </Typography>
        {/* <Typography variant="body2">{coolConvertToMinSec()}m</Typography> */}
      </CardContent>
    </Card>
  );
};

export default SummonerSpellItem;
