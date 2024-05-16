import { useCallback } from "react";
import { useSummonerSpellStore } from "../store/SummonerSpellStore";
import { useVersionStore } from "../store/VersionStore";

const useSummonerSpellStoreHook = () => {
  const latestVersion = useVersionStore((store) => store.latestVersion);
  const getSummonerSpells = useSummonerSpellStore(
    (store) => store.getSummonerSpell,
  );

  const getSummonerSpellsWithVersion = useCallback(async () => {
    if (latestVersion) {
      await getSummonerSpells(latestVersion);
    }
  }, [latestVersion, getSummonerSpells]);

  return getSummonerSpellsWithVersion;
};

export default useSummonerSpellStoreHook;
