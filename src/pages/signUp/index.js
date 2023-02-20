import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import Cookies from "js-cookie";
const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
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
        .post("http://localhost:8080/practice-course/v1/user/signup", data)
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
        <label for="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          required
          onChange={onDataChange}
        />
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

        <label>
          <input type="checkbox" name="remember" onChange={handleRoleChange} />{" "}
          Login as a instructor
        </label>

        <div class="clearfix">
          <button type="button" class="signupbtn" onClick={handleSubmit}>
            Sign Up
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
export default SignUp;
