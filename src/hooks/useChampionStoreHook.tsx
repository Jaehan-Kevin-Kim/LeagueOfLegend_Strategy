import { useCallback } from "react";
import { useGetChampionInfo } from "../store/ChampionStore";
import { useVersionStore } from "../store/VersionStore";

const useChampionStoreHook = () => {
  const latestVersion = useVersionStore((state) => state.latestVersion);
  const getChampions = useGetChampionInfo((state) => state.execute);

  const executeGetChampionsWithVersion = useCallback(async () => {
    if (latestVersion) {
      await getChampions(latestVersion);
    }
  }, [latestVersion]);

  return executeGetChampionsWithVersion;
};

export default useChampionStoreHook;
