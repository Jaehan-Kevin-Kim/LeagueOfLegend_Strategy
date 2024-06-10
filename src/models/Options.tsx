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
}

type languages = "KO" | "EN";
export enum Languages {
  KR = "ko_KR",
  EN = "en_US",
}
