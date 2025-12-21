import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import EventForm from "./EventForm";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  
  // Event-themed icons for the background sparks
  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];

  return (
    <div className="page">
      {/* --- CINEMATIC FIRE BACKGROUND --- */}
      <div className="fire-background">
        <div className="fire-aura"></div>
        <div className="fire-core"></div>
        <div className="fire-sparks">
          {[...Array(50)].map((_, i) => (
            <span 
              key={i} 
              className="event-ember" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 15}s`,
                fontSize: `${Math.random() * (10 - 4) + 4}px`,
                animationDuration: `${Math.random() * (15 - 8) + 8}s`
              }}
            >
              {emberIcons[i % emberIcons.length]}
            </span>
          ))}
        </div>
      </div>

      {/* --- PAGE CONTENT --- */}
      <section className="poster">
        <img src="/images/magnus-hero.jpeg" alt="Magnus 2.0" />
        <section className="register">
          <button className="neon-button" onClick={() => window.open("/pdf/MIMS-Magnus-2.0.pdf", "_blank")}>
            MIMS MAGNUS 2.0 BROCHURE
          </button>
          <button className="neon-button" onClick={() => navigate("/register")}>
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

      {/* --- CONNECT SECTION WITH GLOWING ICONS ONLY --- */}
      <section className="poster relative-poster">
        <img src="/images/connect-poster.jpeg" alt="Connect With Us" />
        
        <div className="icon-overlay-container">
          <a 
            href="https://www.instagram.com/mims_magnus?igsh=dDU5N21lMnNnbzJ1" 
            target="_blank" 
            rel="noreferrer" 
            className="social-glow-icon ig"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
              alt="Instagram" 
            />
          </a>
          
          <a href="mailto:mimsmagnus2.0@gmail.com" className="social-glow-icon mail">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" 
              alt="Gmail" 
            />
          </a>
        </div>
        <div className="contact-overlay-container">
        <div className="contacts-overlay-card">
            <div className="contacts-list">
              <a href="tel:9886980171" className="contact-item">
                <span className="name">Shivesh:</span> <span className="number">98869 80171</span>
              </a>
              <a href="tel:8310840355" className="contact-item">
                <span className="name">Darshan G:</span> <span className="number">831-0840355</span>  
              </a>
              <a href="tel:8431467547" className="contact-item">
                <span className="name">Amith:</span> <span className="number">8431467547</span>
              </a>
              <a href="tel:7090891467" className="contact-item">
                <span className="name">Darshan:</span> <span className="number">7090891467</span>
              </a>


            </div>
          </div>
        </div>
      </section>

      <footer className="simple-footer">
        <p className="copyright">© 2025 MIMS MAGNUS 2.0</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/form/:eventID" element={<EventForm />} />
      </Routes>
    </Router>
  );
}