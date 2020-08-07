import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

enum StorageKeys {
  HAS_LOGGED_IN = "hasLoggedIn",
  HAS_SEEN_TUTORIAL = "hasSeenTutorial",
  USERNAME = "username",
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: StorageKeys.HAS_LOGGED_IN }),
    Storage.get({ key: StorageKeys.HAS_SEEN_TUTORIAL }),
    Storage.get({ key: StorageKeys.USERNAME }),
  ]);

  const isLoggedin = (await response[0].value) === "true";
  const hasSeenTutorial = (await response[1].value) === "true";
  const username = (await response[2].value) || undefined;

  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
  };

  return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({
    key: StorageKeys.HAS_LOGGED_IN,
    value: JSON.stringify(isLoggedIn),
  });
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({
    key: StorageKeys.HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: StorageKeys.USERNAME });
  } else {
    await Storage.set({ key: StorageKeys.USERNAME, value: username });
  }
};
