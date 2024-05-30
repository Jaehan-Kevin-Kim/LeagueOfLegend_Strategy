import { useCallback } from "react";
import { useGetChampionInfo } from "../store/ChampionStore";
import { useVersionStore } from "../store/VersionStore";
import { useOptionStore } from "../store/OptionStore";

const useChampionStoreHook = () => {
  const latestVersion = useVersionStore((state) => state.latestVersion);
  const language = useOptionStore((state) => state.options.language);
  const getChampions = useGetChampionInfo((state) => state.execute);

  const executeGetChampionsWithVersion = useCallback(async () => {
    if (latestVersion && language) {
      await getChampions(latestVersion, language);
    }
  }, [latestVersion]);

  return executeGetChampionsWithVersion;
};

export default useChampionStoreHook;
