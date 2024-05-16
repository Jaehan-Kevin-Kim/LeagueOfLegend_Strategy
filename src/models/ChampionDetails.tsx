export interface IChampionDetails {
  id: string;
  key: string;
  name: string;
  title: string;
  image: IImage;
  skins: ISkin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: IInfo;
  stats: IStats;
  spells: ISpell[];
  passive: IPassive;
  recommended: any[];
}

export interface IImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ISkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

export interface IInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface IStats {
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

export interface ISpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: ILevelTip;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: any;
  effect: Array<number[] | null>;
  effectBurn: Array<string | null>;
  vars: any[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: IImage;
  resource: string;
}

export interface ILevelTip {
  label: string[];
  effect: string[];
}

export interface IPassive {
  name: string;
  description: string;
  image: IImage;
}
