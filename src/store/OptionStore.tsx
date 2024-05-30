import { create } from "zustand";
import { IOptions, Languages } from "../models/Options";

interface OptionStore extends OptionState {
  updateOption: (options: IOptions) => void;
  updateMinimapAlertRepeatPeriod: (time: number) => void;
}

interface OptionState {
  options: IOptions;
  minimapAlertRepeatPeriod: number;
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
    minimapAlertSound: true,
    language: Languages.KR,
  },
  minimapAlertRepeatPeriod: 8,
};

export const useOptionStore = create<OptionStore>((set, get) => ({
  ...initialState,

  updateOption: (options: IOptions) => {
    const updatedOptions = { ...initialState, options };
    console.log("updatedOptions: ", updatedOptions.options);

    set({ ...initialState, options });
  },

  updateMinimapAlertRepeatPeriod: (time: number) => {
    const currentOptions = get().options;
    set({ ...currentOptions, minimapAlertRepeatPeriod: time });
  },
}));
