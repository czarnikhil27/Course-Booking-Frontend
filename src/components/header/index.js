import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Cookies from "js-cookie";
const HeaderBar = (props) => {
  const { course, setCourse, setFilter, filter, displayCategory } = props;
  const [category, setCategory] = useState([]);
  console.log(process.env)
  const navigate = useNavigate();
  function categoryChange(e) {
    setFilter(e.target.value);
  }
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(`${process.env.REACT_APP_URL}practice-course/v1/course/get-category`, config)
      .then((response) => {
        setCategory(response.data);
      });
  }, []);
  function handleSignOut() {
    Cookies.remove("Token");
    Cookies.remove("role");
    navigate("/login");
  }

  return (
    <div>
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          {Cookies.get("Token") && (
            <li>
              <a href="/my-courses">My Courses</a>
            </li>
          )}
          {Cookies.get("Role") == "instructor" && (
            <li>
              <a href="/upload-courses">Upload Course</a>
            </li>
          )}

          {displayCategory && (
            <li>
              <div className="dropdown">
                <button className="dropbtn">
                  Category
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  {/* {category.data?.map((val, index) => {
                return val;
              })} */}
                  {category.data?.map((val, index) => (
                    <div
                      className={`a ${val}`}
                      onClick={(e) => {
                        setFilter(e.target.classList[1]);
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          )}
          <li>
            <div className="dropdown">
              <button className="dropbtn">
                My Profile
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                {Cookies.get("Token") && (
                  <div className="a" onClick={handleSignOut}>
                    SignOut
                  </div>
                )}
                {!Cookies.get("Token") && (
                  <div className="a" onClick={handleSignOut}>
                    SignIn
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeaderBar;
