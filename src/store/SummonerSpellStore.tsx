import axios from "axios";
import { create } from "zustand";
import { ISummonerSpell } from "../models/SummonerSpells";

interface SummonerSpellStore extends SummonerSpellState {
  getSummonerSpell: (version: string) => Promise<void>;
}

interface SummonerSpellState {
  loading: boolean;
  spells: ISummonerSpell[];
  error: string | null;
  success: boolean;
}

const initialState: SummonerSpellState = {
  loading: false,
  spells: [],
  error: null,
  success: false,
};

export const useSummonerSpellStore = create<SummonerSpellStore>((set, get) => ({
  ...initialState,

  getSummonerSpell: async (version: string) => {
    set({ ...initialState, loading: true });
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`,
      );

      console.log("data for summoner spell: ", data);
      const spellArray: ISummonerSpell[] = Object.values(data);
      set({
        ...initialState,
        spells: spellArray,
        loading: false,
        success: true,
      });
    } catch (err: any) {
      console.error("error in data fetch: ", err);
      set({ ...initialState, error: err.message });
    }
  },
}));

// Summoner Spells
// https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/summoner.json
// https://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/SummonerFlash.png
