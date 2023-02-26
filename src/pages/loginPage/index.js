import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Cookies from "js-cookie";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleForgot=()=>{
    if(email.length<=1)
    {
      setError("enter email");
      return;
    }
    axios.post(`${process.env.REACT_APP_URL}practice-course/v1/user/forgot-password`,{email:email}).then((res)=>{
      if(res.status==200)
      {
        navigate('/reset-password');
      }
    })
    .catch((err)=>{console.log(err)})
    navigate('/reset-password')
  }
 
  async function handleLogin() {
    const verified = axios
      .post(`${process.env.REACT_APP_URL}practice-course/v1/user/login`, {
        email: email,
        password: password,
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.set('Token',response.data.token)
          Cookies.set('Role',response.data.role)
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
      <button onClick={handleForgot}>Forgot Password?</button>
      <span>{error}</span>
    </div>
  );
};
export default LoginPage;
