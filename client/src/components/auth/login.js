import loginImage from "../../assets/images/login.svg";
import "./auth.scss";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login" />
          </div>
          <div id="form-section">
            <h2>Welcome Back</h2>

            <form>
              <div className="input-field mb-1">
                <input placeholder="Email" />
              </div>
              <div className="input-field mb-2">
                <input placeholder="Password" />
              </div>
              <button>Login</button>
            </form>

            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
