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
