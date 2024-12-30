import { create } from "zustand";
import {
  Alert,
  IAlerts,
  IOptions,
  Languages,
  SliderTypes,
} from "../models/Options";
import { ALERTS } from "../constants";

interface OptionStore extends OptionState {
  updateOption: (options: IOptions) => void;
  updateMinimapAlertRepeatPeriod: (time: number) => void;
  updateSliderPeriod: (sliderType: SliderTypes, time: number) => void;
  updateAlert: (alert: Alert) => void;
  updateAlerts: (alerts: Alert[]) => void;
}

interface OptionState {
  options: IOptions;
  alerts: IAlerts;
  minimapAlertRepeatPeriod: number;
  gameReminderAlertPeriod: number;
}

//// 추가 할 소리
/*

상대 스킬 빠지면 딜교 (10분 이전 까지, 매 10초 마다)
미니언 잘 먹기(15분 이전 까지, 매 15초 마다)
삼각형 구도 (15분 이전 까지, 매 10초 마다)
상대방 미니언 막타 때 딜교, 우리 미니언 체력 보기 (10분 이전 까지, 매 10초 마다)
거리조절 (15분 이후 부터, 매 15초 마다)
스펠 체크 (1분 마다)
라인 복귀 시 내 스펠, 아이템, 상대 아이템, 스킬 체크 (10분 이후 부터 30초 마다)


## 케이틀린 시 
- 그리고 상대의 스킬이 위험하다 싶을때 or 상대방이 빠르게 나한테 붙으려고 할 때, e q 평으로 딜교 하기. 
- 반드시 평 먼저 하고 e q 평 하기
- w 덫을 깔때 좀 더 신중하게 정확한 위치에 설치 하기. (특히 블리츠 그랩 시)

  */

const initialState: OptionState = {
  options: {
    minimumView: false,
    showSkillDetails: true,
    showMyTeam: true,
    showOpponent: true,
    showSpells: true,
    showPositions: true,
    alarmSound: true,
    testMode: process.env.NODE_ENV === "development" ? true : false,
    minimapAlertSound: true,
    language: Languages.EN,
    darkMode: false,
    newWaveCreationSound: false,
    gameReminderAlertSound: true,
    muteAll: false,
  },
  alerts: {
    // alerts: [...ALERTS],
    alerts: [...ALERTS.sort((a, b) => a.startSeconds - b.startSeconds)],
  },
  minimapAlertRepeatPeriod: 8,
  gameReminderAlertPeriod: 20,
};

export const useOptionStore = create<OptionStore>((set, get) => ({
  ...initialState,

  updateOption: (options: IOptions) => {
    // const currentOptions = get().options;

    const updatedOptions = { ...initialState, options };

    // set({ ...initialState, options });
    set({ options: options });
  },

  updateAlert: (alert: Alert) => {
    const currentOptions = get().options;

    const currentAlerts = get().alerts.alerts;
    const updatedAlerts = currentAlerts.map((existAlert) =>
      existAlert.key === alert.key
        ? {
            ...alert,
          }
        : existAlert,
    );

    // set((state) => ({
    //   alerts: {
    //     ...state.alerts,
    //     alerts: updatedAlerts,
    //   },
    // }));
    // set((state) => ({
    //   ...state,
    //   alerts: { ...state.alerts, alerts: updatedAlerts },
    // }));
    // set({options:{...currentOptions}, alerts:{alerts:{...currentAlerts}}});
    set({ alerts: { alerts: [...updatedAlerts] } });

    // set((state) => ({
    //   alerts: {
    //     alerts: updatedAlerts,
    //   },
    // }));

    // const currentOptions = get().options;

    // set([...currentAlerts, { key: alert.key, ...alert }]);
    // set({options:currentOptions, alerts:{...currentAlerts, {key:alert.key, ...alert}}})
  },

  updateAlerts: (alerts: Alert[]) => {
    set({ alerts: { alerts: alerts } });
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
