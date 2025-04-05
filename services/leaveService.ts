import api from './api';

export const fetchAllLeaves = async () => {
  const response = await api.get('/leave/all');
  return response.data;
};

export const fetchLeaveById = async (id: string) => {
  const response = await api.get(`/leave/${id}`);
  return response.data;
};