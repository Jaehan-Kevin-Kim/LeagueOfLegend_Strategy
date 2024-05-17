import axios from "axios";
import { create } from "zustand";
import { IChampion, ITeamChampInfo } from "../models/Champion";
import { POSITIONS } from "../constants";

// const initialState = {
//   // champion: any;
//   loading: false,
//   success: false,
//   error: false,
//   data: null,
//   errorData: null,
// };

// 상태에 대한 인터페이스 정의
interface ChampionState {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: IChampion[] | []; // 좀 더 구체적인 타입으로 변경 가능
  errorData: string | null;
  teamChampsInfo: ITeamChampInfo[];
  // showSkillDetails: boolean;
}

// 스토어의 메서드 및 상태를 포함하는 인터페이스 정의
interface ChampionStore extends ChampionState {
  execute: (version: string) => Promise<void>;
  // changeShowSkillDetails: (value: boolean) => void;
}

const initializeTeamChampsInfo = () => {
  return POSITIONS.flatMap((position) => [
    { team: "MyTeam", champion: null, position },
    { team: "Opponent", champion: null, position },
  ]);
};

const initialState: ChampionState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  teamChampsInfo: initializeTeamChampsInfo(),
  // showSkillDetails: true,
};

// export const useGetChampionInfo = create((set, get) => ({
export const useGetChampionInfo = create<ChampionStore>((set, get) => ({
  ...initialState,

  execute: async (version: string) => {
    set({ ...initialState, loading: true });
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`,
      );
      const championArray: IChampion[] = Object.values(data);

      console.log("championArray: ", championArray);
      // championArray.filter(champion=>champion.championName.toLowerCase())

      set({ ...initialState, success: true, data: championArray });
    } catch (err: any) {
      console.error("Error in data fetch: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },

  updateTeamChampsInfo: (
    // teamChampsInfo: ITeamChampInfo[],
    team: string,
    champion: IChampion,
    position: string,
  ) => {
    const currentTeamChampsInfo = get().teamChampsInfo;
    const updatedTeamChampsInfo = currentTeamChampsInfo.map((info) =>
      info.position === position && info.team === team
        ? { ...info, champion }
        : info,
    );

    set({ teamChampsInfo: updatedTeamChampsInfo });
  },

  resetSpecificTeamChampsInfo: (team: string) => {
    const currentTeamChampsInfo = get().teamChampsInfo;
    const updatedTeamChampsInfo = currentTeamChampsInfo.map((info) =>
      info.team === team ? { ...info, champion: null } : info,
    );

    set({ teamChampsInfo: updatedTeamChampsInfo });
  },

  resetAllTeamsChampsInfo: () => {
    set({ teamChampsInfo: initialState.teamChampsInfo });
  },

  // changeShowSkillDetails: (value: boolean) => {
  //   set({ ...initialState, showSkillDetails: value });
  // },
}));
