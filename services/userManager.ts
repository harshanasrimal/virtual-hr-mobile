import AsyncStorage from '@react-native-async-storage/async-storage';

let cachedUser: any = null;

const USER_KEY = 'loggedInUser';

export const setUser = async (userData: any) => {
  cachedUser = userData;
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getUser = async () => {
  if (cachedUser) return cachedUser;

  const stored = await AsyncStorage.getItem(USER_KEY);
  if (stored) {
    cachedUser = JSON.parse(stored);
    return cachedUser;
  }

  return null;
};

export const clearUser = async () => {
  cachedUser = null;
  await AsyncStorage.removeItem(USER_KEY);
};
