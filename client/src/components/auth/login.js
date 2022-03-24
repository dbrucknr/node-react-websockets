import loginImage from "../../assets/images/login.svg";
import "./auth.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/login", { email: email, password: password })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login" />
          </div>
          <div id="form-section">
            <h2>Welcome Back</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-field mb-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required="required"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="input-field mb-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required="required"
                  type="password"
                  placeholder="Password"
                />
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
