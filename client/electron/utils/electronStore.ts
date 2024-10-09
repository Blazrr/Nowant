import Store from "electron-store";
const store = new Store();

// recuperation du token (connexion user)
export const getToken = () => {
  return store.get("token");
};

// enregistrement du token (connexion user)
export const setToken = (arg: string) => {
  store.set("token", arg);
};

// suppression du token (deconnexion user)
export const removeToken = () => {
  store.delete("token");
};
