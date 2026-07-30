import React, { useState } from "react";
import { Eye, EyeOff, Pill } from "lucide-react";
import { userAPI } from "../services/api";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await userAPI.login(formData);

      localStorage.setItem("token", response.token || "loggedin");
      localStorage.setItem("user", JSON.stringify(response.user || {}));

      onLogin();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">

          <div className="login-logo">
            <Pill size={60} />
          </div>

          <h1>CMR Medical Agency</h1>

          <p>
            Medical Management System
          </p>

        </div>

        <div className="login-right">

          <h2>Welcome Back</h2>

          <p>Please login to continue.</p>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="login-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="login-group">

              <label>Password</label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Login;