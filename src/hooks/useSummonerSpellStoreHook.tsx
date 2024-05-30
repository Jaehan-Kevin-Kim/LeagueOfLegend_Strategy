import { useCallback } from "react";
import { useSummonerSpellStore } from "../store/SummonerSpellStore";
import { useVersionStore } from "../store/VersionStore";
import { useOptionStore } from "../store/OptionStore";

const useSummonerSpellStoreHook = () => {
  const latestVersion = useVersionStore((store) => store.latestVersion);
  const language = useOptionStore((state) => state.options.language);

  const getSummonerSpells = useSummonerSpellStore(
    (store) => store.getSummonerSpell,
  );

  const getSummonerSpellsWithVersion = useCallback(async () => {
    if (latestVersion && language) {
      await getSummonerSpells(latestVersion, language);
    }
  }, [latestVersion, getSummonerSpells]);

  return getSummonerSpellsWithVersion;
};

export default useSummonerSpellStoreHook;
