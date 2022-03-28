import api from "./api";

export const AuthService = {
  login: async (data) => {
    return api
      .post("/login", data)
      .then(({ data }) => {
        setHeadersandLocalStorage(data);
        return data;
      })
      .catch((err) => {
        console.error("Auth Service Error", err);
        throw err;
      });
  },
  register: async (data) => {
    return api
      .post("/register", data)
      .then(({ data }) => {
        setHeadersandLocalStorage(data);
        return data;
      })
      .catch((err) => {
        console.error("Auth Service Error", err);
        throw err;
      });
  },
  logout: () => {
    api.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  updateProfile: async (data) => {
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    return api
      .post("/users/update", data, headers)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      })
      .catch((err) => {
        console.error("User Service Error", err);
        throw err;
      });
  },
};

const setHeadersandLocalStorage = ({ user, token }) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};
