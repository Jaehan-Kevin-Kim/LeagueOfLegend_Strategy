export interface IOptions {
  //   [key: string]: boolean;
  minimumView: boolean;
  showSkillDetails: boolean;
  showMyTeam: boolean;
  showOpponent: boolean;
  showSpells: boolean;
  showPositions: boolean;
  alarmSound: boolean;
  testMode: boolean;
  minimapAlertSound: boolean;
  newWaveCreationSound: boolean;
  gameReminderAlertSound: boolean;
  language: Languages;
  darkMode: boolean;
  muteAll: boolean;
  // alerts: Alert[];
}

export interface IAlerts {
  alerts: Alert[];
}

export enum SliderTypes {
  MinimapAlert = "minimapAlert",
  GameReminder = "gameReminder",
}

type languages = "KO" | "EN";
export enum Languages {
  KR = "ko_KR",
  EN = "en_US",
}

export interface Alert {
  key: string;
  name_kr: string;
  name_en: string;
  audio_kr: string;
  audio_en: string;
  active: boolean;
  periodSeconds: number;
  startSeconds: number;
  endSeconds: number;
  periodSecondsOptions: number[];
  startSecondsOptions: number[];
  endSecondsOptions: number[];
}
