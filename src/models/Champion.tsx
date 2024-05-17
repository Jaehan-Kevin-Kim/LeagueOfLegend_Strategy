export interface IChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface IChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface IChampion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: IChampionInfo;
  image: IChampionImage;
  tags: string[];
  partype: string;
  stats: IChampionStats;
}

export interface ITeamChampInfo {
  team: string;
  champion: IChampion | null;
  position: string;
}

// 각 챔피언의 데이터를 맵 형태로 정의합니다.
// export interface IChampions {
//   [key: string]: Champion;
// }

// export type ChampionEntry = { [championName: string]: Champion };
// export type ChampionArray = ChampionEntry[];
