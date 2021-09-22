import axios from "../../core/axios";

export const userService = {
  getUserDetail: async () => {
    const { data } = await axios.get("/api/user", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return data;
  },
};
