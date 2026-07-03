import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import JobApplicationForm from "./Pages/JobApplicationForm";
import ViewJobsPosts from "./Pages/ViewJobsPosts";
import JobPostForm from "./Pages/JobPostForm";
import Navbar from "./Components/Navbar.jsx";
import UpdateJobPost from "./Pages/UpdateJobPost.jsx";
import Applicants from "./Components/Applicants.jsx";
import ApplicantsList from "./Components/ApplicantsList.jsx";
import AnimatedPage from "./Components/AnimatedPage.jsx";

function AppContent() {
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("jobportal-theme") || "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("jobportal-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div key={location.pathname}>
        <Routes>
          <Route
            path="/register"
            element={
              <AnimatedPage>
                <Register />
              </AnimatedPage>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            }
          />
          <Route
            path="/"
            element={
              <AnimatedPage>
                <HomePage />
              </AnimatedPage>
            }
          />
          <Route
            path="/job-post"
            element={
              <AnimatedPage>
                <JobPostForm />
              </AnimatedPage>
            }
          />
          <Route
            path="/job-listing"
            element={
              <AnimatedPage>
                <ViewJobsPosts />
              </AnimatedPage>
            }
          />
          <Route
            path="/job-application"
            element={
              <AnimatedPage>
                <JobApplicationForm />
              </AnimatedPage>
            }
          />
          <Route
            path="/updateJobPost"
            element={
              <AnimatedPage>
                <UpdateJobPost />
              </AnimatedPage>
            }
          />
          <Route
            path="/applicants"
            element={
              <AnimatedPage>
                <Applicants />
              </AnimatedPage>
            }
          />
          <Route
            path="/applicantsList"
            element={
              <AnimatedPage>
                <ApplicantsList />
              </AnimatedPage>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
