import { AuthService } from "../../services/authService";
export const LOGIN = "LOGIN";

export const login = (params, navigate) => async (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      console.log("login action", data);
      dispatch({ type: LOGIN, payload: data });
      navigate("/");
    })
    .catch((err) => console.error(err));
};
