import { Alert } from "./models/Options";

export const POSITIONS = ["TOP", "JG", "MID", "ADC", "SUPP"];


export const ALERT_TIMES_MESSAGES = [
    { seconds: 150, message_kr: `2:30 <br />정 버프: 3캠프 3랩 갱 타이밍`, audio: '/sounds/warnings/2min_30secs_3camp_3lev_gang_kr.mp3' },
    { seconds: 170, message_kr: `2:50 <br />4 캠프: 3랩 갱 타이밍`, audio: '/sounds/warnings/2min_50secs_4camp_3lev_gang_kr.mp3' },
    { seconds: 190, message_kr: `3:10 <br />Bottom 3렙 타이밍`, audio: '/sounds/warnings/3min_10secs_bottom_3lev_kr.mp3' },
    { seconds: 205, message_kr: `3:20 <br />바위개 싸움 시간, 정글 위치 확인 (만약 우리 정글이 바위게에 있는데 상대정글이 안보이면 반대 바위게에 있을 확률 높음)`, audio: '/sounds/warnings/3min_20secs_rockdog_kr.mp3' },
    { seconds: 360, message_kr: `6:00 <br />정글 아래 있을 확률 높음`, audio: '/sounds/warnings/6min_jungle_bottom_kr.mp3' },
    { seconds: 450, message_kr: `7:30 <br />정글 위에 있을 확률 높음`, audio: '/sounds/warnings/7mins_30secs_jungle_bottom_kr.mp3' },
    { seconds: 480, message_kr: `8:00 <br />정글 6랩 타이밍`, audio: '/sounds/warnings/8mins_jungle_lev6_kr.mp3' },
]

export const GAME_REMINDER_MESSAGES = [
    { seconds: 190, message_kr: `3:10 <br />Bottom 3렙 타이밍` },



]


export const BUILD_WEB_ADDRESS = 'https://www.deeplol.gg/champions'

export const SKILL_WEB_ADDRESS = 'https://www.leagueoflegends.com/ko-kr/champions'



export const MINIMAP_CHECK_ALERT: Alert = {
    key: "minimapCheckAlert",
    name_en: "Minimap Checker",
    name_kr: "미니맵 확인",
    audio_kr: "/sounds/alerts/minimap_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 8,
    startSeconds: 120,
    endSeconds: 3000,
    periodSecondsOptions: [3, 5, 8, 10, 15, 20],
    startSecondsOptions: [90, 120, 150, 200, 250],
    endSecondsOptions: [600, 1200, 1500, 2000, 2500, 3000],
};

export const FOCUS_MINION_ALERT: Alert = {
    key: "focusMinionAlert",
    name_en: "Focus on Minion",
    name_kr: "미니언 집중",
    audio_kr: "/sounds/alerts/minions_kr.mp3",
    audio_en: '',
    active: false,
    periodSeconds: 10,
    startSeconds: 120,
    endSeconds: 900,
    periodSecondsOptions: [9, 10, 14, 18, 23],
    startSecondsOptions: [100, 120, 160, 210, 260],
    endSecondsOptions: [600, 900, 1100, 1600],
};

export const OPPONENT_SKILL_USED_ALERT: Alert = {
    key: "opponentSkillUsedAlert",
    name_en: "Opponent Skill",
    name_kr: "상대방 스킬 사용 후 딜교",
    audio_kr: "/sounds/alerts/opponont_skill_used_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 10,
    startSeconds: 100,
    endSeconds: 600,
    periodSecondsOptions: [7, 10, 13, 17, 22],
    startSecondsOptions: [100, 130, 160, 180],
    endSecondsOptions: [300, 400, 500, 600, 700, 800],
};
export const TRAIANGLE_ALERT: Alert = {
    key: "triangleAlert",
    name_en: "Triangle Formation",
    name_kr: "삼각형 구도 유지",
    audio_kr: "/sounds/alerts/trangle_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 10,
    startSeconds: 105,
    endSeconds: 900,
    periodSecondsOptions: [8, 10, 12, 16, 24],
    startSecondsOptions: [105, 108, 120, 150, 190],
    endSecondsOptions: [600, 750, 900, 1100],
};
export const OPPONENT_MINION_ALERT: Alert = {
    key: "opponentMinionAlert",
    name_en: "Attack during Opponent Minion ",
    name_kr: "상대방 미니언 먹을 때 딜교",
    audio_kr: "/sounds/alerts/opponent_minion_attack_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 10,
    startSeconds: 110,
    endSeconds: 600,
    periodSecondsOptions: [7, 10, 13, 19, 21],
    startSecondsOptions: [100, 110, 118, 127, 140],
    endSecondsOptions: [500, 600, 650, 720, 800],
};
export const KEEP_DISTANCE_ALERT: Alert = {
    key: "keepDistanceAlert",
    name_en: "Keep Distance",
    name_kr: "상대 근접 챔프와 거리유지",
    audio_kr: "/sounds/alerts/keep_distance_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 15,
    startSeconds: 900,
    endSeconds: 3000,
    periodSecondsOptions: [10, 15, 20, 25, 30],
    startSecondsOptions: [710, 820, 900, 1010, 1130, 1300],
    endSecondsOptions: [2000, 2500, 3000],
};
export const SKILL_REMAINING_TIME_CHECK: Alert = {
    key: "skillRemainingTimeCheck",
    name_en: "Skill Remaining Time Check",
    name_kr: "스킬 쿨 타임 확인",
    audio_kr: "/sounds/alerts/skill_cooltime_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 15,
    startSeconds: 900,
    endSeconds: 3000,
    periodSecondsOptions: [10, 15, 20, 25, 30],
    startSecondsOptions: [710, 820, 900, 1010, 1130, 1300],
    endSecondsOptions: [2000, 2500, 3000],
};
export const SPELL_CHECK_ALERT: Alert = {
    key: "spellCheckAlert",
    name_en: "Spell Check",
    name_kr: "스펠 체크",
    audio_kr: "/sounds/alerts/spell_check.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 60,
    startSeconds: 120,
    endSeconds: 3000,
    periodSecondsOptions: [60, 120, 180, 240],
    startSecondsOptions: [120, 200, 300, 400],
    endSecondsOptions: [1900, 2400, 3000],
};
export const RETURN_TO_LINE_ALERT: Alert = {
    key: "returnToLineAlert",
    name_en: "Checklist when returns to Line",
    name_kr: "라인 복귀 시 확인 할 것들",
    audio_kr: "/sounds/alerts/return_to_line_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 30,
    startSeconds: 600,
    endSeconds: 3000,
    periodSecondsOptions: [15, 30, 60, 75, 90, 120],
    startSecondsOptions: [550, 600, 720, 810, 940],
    endSecondsOptions: [2200, 2600, 3000],
};

export const LESS_MOUSE_CLICK_ALERT: Alert = {
    key: "lessMouseClickAlert",
    name_en: "Click Less",
    name_kr: "마우스 클릭 적게 하기",
    audio_kr: "/sounds/alerts/less_click_kr.mp3",
    audio_en: '',
    active: true,
    periodSeconds: 12,
    startSeconds: 95,
    endSeconds: 3000,
    periodSecondsOptions: [12, 16, 19, 23, 32],
    startSecondsOptions: [95, 105, 115, 135, 200],
    endSecondsOptions: [2200, 2600, 3000],
};


export const ALERTS = [
    MINIMAP_CHECK_ALERT,
    FOCUS_MINION_ALERT,
    OPPONENT_SKILL_USED_ALERT,
    TRAIANGLE_ALERT,
    OPPONENT_MINION_ALERT,
    KEEP_DISTANCE_ALERT,
    SKILL_REMAINING_TIME_CHECK,
    SPELL_CHECK_ALERT,
    RETURN_TO_LINE_ALERT,
    LESS_MOUSE_CLICK_ALERT
]
