import AsyncStorage from '@react-native-async-storage/async-storage';

let token: string | null;

export const setToken = async (newToken: string) => {
  token = newToken;
  await AsyncStorage.setItem('accessToken', newToken);
};

export const getToken = async () => {
  if (token) return token;

  token = await AsyncStorage.getItem('accessToken');
  return token;
};

export const clearToken = async () => {
  token = null;
  await AsyncStorage.removeItem('accessToken');
};
