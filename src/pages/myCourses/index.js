import React from "react";
import { useState, useEffect } from "react";
import CourseCard from "../../components/courseCard";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderBar from '../../components/header'
import "./styles.css";
const MyCourses = () => {  
  const [course, setCourse] = useState([]);
  const[filer,setFiler] = useState('finance');

  useEffect(() => {
    const a = new URLSearchParams(window.location);
    
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(
        `${process.env.REACT_APP_URL}practice-course/v1/course/user-courses`,
        config
      )
      .then((response) => {
       setCourse(response.data)
       setCourse(response.data)
      });
  }, []);
  return (
    <div className="container">
      <HeaderBar course={course} setCourse={setCourse} setFiler={setFiler}/>
      <CourseCard course={course} />
    </div>
  );
};
export default MyCourses;
