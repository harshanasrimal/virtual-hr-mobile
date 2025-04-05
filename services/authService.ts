import API from './api';
import { setToken, clearToken } from './tokenManager';
import { clearUser, setUser } from './userManager';


export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
if (res.status !== 200 && res.status !== 201) {
    return null;
}

const { access_token, user } = res.data;

// Set token and user in AsyncStorage
  await setToken(access_token);
  await setUser(user);

  return user;
};

export const logout = async () => {
  await clearToken();
    await clearUser();
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const res = await API.post("/auth/change-password", data);
  console.log(res);
  return res.data;
};
