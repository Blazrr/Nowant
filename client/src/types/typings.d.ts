export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  profile: Profile;
};

type Profile = {
  picture: string;
  settings: Settings;
};

type Settings = {
  mapSize: number;
  mapZoom: number;
  showMap: boolean;
};

export type Map = {
  uuid: string;
  displayName: string;
  narrativeDescription: string | null;
  tacticalDescription: string;
  coordinates: string;
  displayIcon: string;
  listViewIcon: string;
  listViewIconTall: string;
  splash: string;
  stylizedBackgroundImage: string;
  premierBackgroundImage: string;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
};

type Role = {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
};

type Ability = {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
};

export type Agent = {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role | null;
  recruitmentData: any | null;
  abilities: Ability[];
  voiceLine: any | null;
};

export type Participation = {
  id: number;
  timer: number;
  agent: string;
  spell: string;
  x: number;
  y: number;
  user: User;
  lobby: Lobby;
};

export type Lobby = {
  id: number;
  name: string;
  map: string;
  participations: Participation[];
  user: User;
  password: string;
  createdAt: string;
  updatedAt: string;
};
