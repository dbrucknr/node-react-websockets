import { AuthService } from "../../services/authService";
export const LOGIN = "LOGIN";
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

export const register = (params, navigate) => async (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      console.log("register action", data);
      dispatch({ type: REGISTER, payload: data });
      navigate("/");
    })
    .catch((err) => console.error(err));
};
