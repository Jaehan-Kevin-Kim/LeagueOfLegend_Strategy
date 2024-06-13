import { create } from "zustand";
import { IOptions, Languages, SliderTypes } from "../models/Options";

interface OptionStore extends OptionState {
  updateOption: (options: IOptions) => void;
  updateMinimapAlertRepeatPeriod: (time: number) => void;
  updateSliderPeriod: (sliderType: SliderTypes, time: number) => void;
}

interface OptionState {
  options: IOptions;
  minimapAlertRepeatPeriod: number;
  gameReminderAlertPeriod: number;
}

const initialState: OptionState = {
  options: {
    minimumView: true,
    showSkillDetails: true,
    showMyTeam: true,
    showOpponent: true,
    showSpells: true,
    showPositions: true,
    alarmSound: true,
    testMode: process.env.NODE_ENV === "development" ? true : false,
    minimapAlertSound: true,
    language: Languages.KR,
    darkMode: false,
    newWaveCreationSound: false,
    gameReminderAlertSound: true,
    muteAll: false,
  },
  minimapAlertRepeatPeriod: 8,
  gameReminderAlertPeriod: 20,
};

export const useOptionStore = create<OptionStore>((set, get) => ({
  ...initialState,

  updateOption: (options: IOptions) => {
    const updatedOptions = { ...initialState, options };
    console.log("updatedOptions: ", updatedOptions.options);

    set({ ...initialState, options });
  },

  updateSliderPeriod: (sliderType: SliderTypes, time: number) => {
    // if (sliderType === SliderTypes)
    const currentOptions = get().options;

    switch (sliderType) {
      case SliderTypes.MinimapAlert:
        set({ ...currentOptions, minimapAlertRepeatPeriod: time });
        break;

      case SliderTypes.GameReminder:
        set({ ...currentOptions, gameReminderAlertPeriod: time });
        break;
    }
  },

  updateMinimapAlertRepeatPeriod: (time: number) => {
    const currentOptions = get().options;
    set({ ...currentOptions, minimapAlertRepeatPeriod: time });
  },

  updateGameReminderAlertPeriod: (time: number) => {
    const currentOptions = get().options;
    set({ ...currentOptions, gameReminderAlertPeriod: time });
  },
}));
