import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageForm from "./components/form";
import BuyCourse from "./pages/buyCourse";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import MyCourses from "./pages/myCourses";
import SignUp from "./pages/signUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<BuyCourse />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/upload-courses" element={<ImageForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
