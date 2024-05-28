import { create } from "zustand";
import { IOptions } from "../models/Options";

interface OptionStore extends OptionState {
  updateOption: (options: IOptions) => void;
}

interface OptionState {
  options: IOptions;
}

const initialState: OptionState = {
  options: {
    minimumView: true,
    showSkillDetails: true,
    showMyTeam: true,
    showOpponent: true,
    showSpells: false,
    showPositions: true,
    alarmSound: true,
    testMode: false,
  },
};

export const useOptionStore = create<OptionStore>((set, get) => ({
  ...initialState,

  updateOption: (options: IOptions) => {
    const updatedOptions = { ...initialState, options };
    console.log("updatedOptions: ", updatedOptions.options);

    set({ ...initialState, options });
  },
}));
