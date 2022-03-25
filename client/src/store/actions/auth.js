import { AuthService } from "../../services/authService";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

export const login = (params, navigate) => async (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      console.log("login action", data);
      dispatch({ type: LOGIN, payload: data });
      navigate("/");
    })
    .catch((err) => console.error(err));
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

export const register = (params, navigate) => async (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      console.log("register action", data);
      dispatch({ type: REGISTER, payload: data });
      navigate("/");
    })
    .catch((err) => console.error(err));
};
