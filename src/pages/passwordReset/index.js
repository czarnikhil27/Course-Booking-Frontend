import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import Cookies from "js-cookie";
const PasswordReset = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [token,setToken] = useState("");
  const [error, setError] = useState("");
  console.log(token);
  const handleRoleChange = (e) => {
    const temp = data; 
    if (data.role == "user") {
      temp.role = "instructor";
    } else {
      temp.role = "user";
    }
    setData(temp);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (data.password.length <= 8) {
        setError("length of password is insufficient");
      }
      if (data.password !== data.confirmPassword) {
        setError("passwords do not match");
      }
      await axios
        .post(`${process.env.REACT_APP_URL}practice-course/v1/user/reset-password/${token}`, 
        {
            "password":data.password,
            "passwordConfirm":data.confirmPassword
        })
        .then((response) => {
          if (response.status === 200) {
            Cookies.set('Token',response.data.token)
            Cookies.set('Role',response.data.role)
            navigate("/login");
          } else {
          }
        });
      
    } catch (err) {
      setError("userId already exists");
    }
  };
  const onDataChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      const newData = { ...prev };
      newData[name] = value;
      return { ...newData };
    });
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <form className="form">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={onDataChange}
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={onDataChange}
        />
        <label for="psw">
          <b>Token</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={(e)=>setToken(e.currentTarget.value)}
        />

        <label for="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          onChange={onDataChange}
        />
        
        <div class="clearfix">
          <button type="button" class="signupbtn" onClick={handleSubmit}>Change Password
            
          </button>
          <button type="submit" class="cancelbtn" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </form>
      <p>{error}</p>
    </div>
  );
};
export default PasswordReset;
