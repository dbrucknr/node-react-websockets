import { AuthService } from "../../services/authService";
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from "../types/index";

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

export const updateProfile = (params) => async (dispatch) => {
  return AuthService.updateProfile(params)
    .then((data) => {
      console.log("update action", data);
      dispatch({ type: UPDATE_PROFILE, payload: data });
    })
    .catch((err) => console.error(err));
};
