import axios from "../../core/axios";

export const authService = {
  login: async (aData) => {
    const { data } = await axios.post("/api/auth/login", aData);

    return data;
  },
  register: async (aData) => {
    const { data } = await axios.post("/api/user/registration", aData);

    return data;
  },
  forgotStart: async (aData) => {
    const { data } = await axios.post("/api/user/forgot-start", aData);

    return data;
  },
  forgotEnd: async (aData) => {
    const { data } = await axios.post("/api/user/forgot-end", aData);

    return data;
  },
  changeAva: async (aData) => {
    const { data } = await axios.post("psevdocode", aData);

    return data;
  },
};
