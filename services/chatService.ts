import API from './api';

export const sendMessage = async (message: string) => {
  const res = await API.post('/chat/message', { message });
    if (res.status !== 200 && res.status !== 201) {
        return null;
    }

  return res.data.message;
};
