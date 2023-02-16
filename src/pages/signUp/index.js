import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/practice-course/v1/user/signup",
        data
      ).then((response) => {
        if (response.status === 200) {
          Cookies.set('Token',response.data.token)
          navigate("/login");
        } else {
          console.log("incorrect password");
        }
      })
    } catch (err) {
      setError(err.message);
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
      <div className="item">
        <span>
          Email:
          <input type="text" name="email" onChange={onDataChange}></input>
        </span>
      </div>
      <div className="item">
        <span>
          Password:
          <input
            type="password"
            name="password"
            onChange={onDataChange}
          ></input>
        </span>
      </div>
      <div className="item">
        <span>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            onChange={onDataChange}
          ></input>
        </span>
      </div>
      <div className="item">
        <span>
          Confirm Password:
          <input
            type="select"
            name="role"
            onChange={onDataChange}
          ></input>
        </span>
      </div>
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
};
export default SignUp;
