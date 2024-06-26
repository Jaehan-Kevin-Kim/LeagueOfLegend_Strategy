import React, { useEffect } from "react";
import useSummonerSpellStoreHook from "../../hooks/useSummonerSpellStoreHook";
import { useSummonerSpellStore } from "../../store/SummonerSpellStore";
import { Grid, Typography } from "@mui/material";
import SummonerSpellItem from "../SummonerSpellItem";
import { useOptionStore } from "../../store/OptionStore";

const SummonerSpells = () => {
  const getSummonerSpellsWithVersion = useSummonerSpellStoreHook();
  const { spells, loading } = useSummonerSpellStore();

  useEffect(() => {
    getSummonerSpellsWithVersion();
  }, [getSummonerSpellsWithVersion]);

  return (
    <div style={{ marginTop: "15px", width: "100%" }}>
      {loading ? (
        <Typography variant="h4">Loading Summoner Spells...</Typography>
      ) : (
        spells && (
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            spacing={1}>
            {spells
              .filter((spell) => spell.modes.includes("CLASSIC"))
              .map((spell) => (
                <Grid item key={spell.id}>
                  <SummonerSpellItem spell={spell}></SummonerSpellItem>
                </Grid>
              ))}
          </Grid>
        )
      )}
    </div>
  );
};

export default SummonerSpells;
