import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Cookies from "js-cookie";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  async function handleLogin() {
    const verified = axios
      .post("http://localhost:8080/practice-course/v1/user/login", {
        email: email,
        password: password,
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.set('Token',response.data.token)
          Cookies.set('Role',response.data.role)
          console.log(response)
          navigate("/");
        } else {
          console.log("incorrect password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <div className="item">
        <span>
          Email:
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </span>
      </div>
      <div className="item">
        <span>
          Password:
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </span>
      </div>
      <button onClick={handleSignUp}>Sign-Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default LoginPage;
