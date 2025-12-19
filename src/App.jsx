import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <section className="poster">
        <img src="/images/magnus-hero.jpeg" alt="Magnus 2.0" />
        <section className="register">
          <button
            onClick={() => window.open("/pdf/MIMS-Magnus-2.0.pdf", "_blank")}
          >
            MIMS MAGNUS 2.0 BROCHURE
          </button>

          <button onClick={() => navigate("/register")}>
            REGISTER NOW
          </button>
        </section>
      </section>

      <section className="poster">
        <img src="/images/about-mims.jpeg" alt="About MIMS" />
      </section>

      <section className="poster">
        <img src="/images/about-magnus.jpeg" alt="About Magnus" />
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
