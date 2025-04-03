import API from './api';
import { setToken, clearToken } from './tokenManager';

export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
if (res.status !== 200 && res.status !== 201) {
    return null;
}
    // Set token in AsyncStorage
  await setToken(res.data.access_token);
  return res.data;
};

export const logout = async () => {
  await clearToken();
};
