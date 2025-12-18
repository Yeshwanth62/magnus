import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="page">
      <section className="poster">
        <img src="/images/magnus-hero.jpeg" alt="Magnus 2.0" />
      </section>

      <section className="poster">
        <img src="/images/about-mims.jpeg" alt="About MIMS" />
      </section>

      <section className="poster">
        <img src="/images/about-magnus.jpeg" alt="About Magnus" />
      </section>

      <section className="register">
        <button
        onClick={() => window.open("/public/pdf/MIMS_Magnus_2.0.pdf", "_blank")}
  >
        MIMS MAGNUS 2.0 BROCHURE
        </button>

        <button>
          REGISTER NOW
        </button>


      </section>

    
    </div>
  );
}
