// src/components/screens/Login.tsx
import React, { useState,  } from "react";
import "../../styles/codezilla.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";
import { useBodyClass } from "../../utils/useBodyClass";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  useBodyClass('login-background'); // ✅ YOUR background image class
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({
        variables: { username, password }
      });

      const token = response.data.login.token;
      localStorage.setItem('token', token);

      if (token) {
        navigate('/map');
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Please check your username and password.");
    }
  };

  const goToSignup = () => navigate('/signup');

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <form className="question-box" onSubmit={handleLogin}>
          <h1>Login</h1>

          <input 
            type="text" 
            placeholder="username" 
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>

          <p>Not a player yet?</p>
          <button type="button" className="signup-button" onClick={goToSignup}>
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
};
