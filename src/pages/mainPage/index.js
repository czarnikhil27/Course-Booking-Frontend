import React from "react";
import { useState, useEffect } from "react";
import CourseCard from "../../components/courseCard";
import HeaderBar from "../../components/header";
import Cookies from "js-cookie";
import axios from "axios";
import "./styles.css";
import { useSearchParams } from "react-router-dom";
const MainPage = () => {
  const [filter, setFilter] = useState("");
  const [course, setCourse] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(true);
  const [bought,setBought] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(
        `${process.env.REACT_APP_URL}practice-course/v1/course?filterCategory=subject_${filter}`,
        config
      )
      .then((response) => {
        setCourse(response.data);
      });
  }, [filter]);
  return (
    <div className="container">
      <HeaderBar
        course={course}
        setCourse={setCourse}
        setFilter={setFilter}
        filter={filter}
        displayCategory={displayCategory}
      />
      <CourseCard course={course} setCourse={setCourse} bought={bought}/>
    </div>
  );
};
export default MainPage;
