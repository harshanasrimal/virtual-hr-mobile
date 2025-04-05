import api from './api';

export const fetchAllDocuments = async () => {
  const res = await api.get('/document/all');
  return res.data;
};