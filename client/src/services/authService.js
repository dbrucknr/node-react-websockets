import api from "./api";

export const AuthService = {
  login: (data) => {
    return api
      .post("/login", data)
      .then(({ data }) => {
        api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      })
      .catch((err) => {
        console.error("Auth Service Error", err);
      });
  },
  register: (data) => {},
  logout: () => {},
};
