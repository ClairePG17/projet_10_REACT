import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import UserProfile from "./pages/UserProfile/UserProfile";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={
              <div className="sign-in-bg">
                <SignIn />
              </div>
            }
          />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
