import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyCourse from "./pages/buyCourse";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import MyCourses from "./pages/myCourses";
import PasswordReset from "./pages/passwordReset";
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
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
