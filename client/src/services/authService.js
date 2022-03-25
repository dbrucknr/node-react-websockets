import api from "./api";

export const AuthService = {
  login: async (data) => {
    return api
      .post("/login", data)
      .then(({ data }) => {
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((err) => {
        console.error("Auth Service Error", err);
      });
  },
  register: (data) => {},
  logout: () => {},
};
