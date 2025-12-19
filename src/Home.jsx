import "./Home.css";

function Home() {
  return (
    <div className="image-wrapper">
      <img
        src="/image/magnus-hero.jpeg"
        alt="Hero"
        className="hero-image"
      />

      <div className="image-overlay">
        <a
          href="/pdf/MIMS-Magnus-2.0.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Brochure
        </a>

        <a href="/register" className="btn btn-primary">
          Register
        </a>
      </div>
    </div>
  );
}

export default Home;
