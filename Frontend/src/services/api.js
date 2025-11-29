import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace("/api", "");

export const uploadModel = async (file) => {
  const formData = new FormData();
  formData.append("model", file);

  const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const saveSettings = async (settings) => {
  const response = await axios.post(`${API_URL}/settings`, settings);
  return response.data;
};

export const getSettings = async () => {
  const response = await axios.get(`${API_URL}/settings`);
  return response.data;
};

export const getAllSettings = async () => {
  const response = await axios.get(`${API_URL}/settings/all`);
  return response.data;
};
