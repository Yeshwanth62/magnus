import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 
import './EventForm.css';

const EventForm = () => {
  const { eventID } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // Ember Icons for the background (Matching your RegisterPage)
  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];

  // Data passed from the selection page
  const { eventTitle, totalPrice } = location.state || { eventTitle: "Event", totalPrice: 0 };

  // Mapping QR codes
  const qrCodes = {
    "cultural": "/qr-cultural.png",
    "literary": "/qr-literary.png",
    "scientific": "/qr-scientific.png",
    "arts-sports": "/qr-sports.png"
  };

  const selectedQR = qrCodes[eventID] || "/qr-default.png";

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.append("Event_Category", eventTitle);
    formData.append("Total_Amount", totalPrice);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwGqTHoUoega_GuIeLIFVYVsJhqhHT3tyId0bjTPm5tcjtR3HHci7FFgRT-SDB1xHap/exec'; 
      
      await fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors' 
      });
      
      alert(`Registration Successful! You have registered for ${eventTitle}.`);
      navigate('/register'); 
    } catch (error) {
      console.error('Submission Error:', error);
      alert("Something went wrong. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container form-page-layout">
      {/* FLOATING EMBER BACKGROUND */}
      <div className="fire-background">
        <div className="fire-aura"></div>
        <div className="fire-core"></div>
        <div className="fire-sparks">
          {[...Array(40)].map((_, i) => (
            <span key={i} className="event-ember" style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * (10 - 4) + 4}px`
            }}>
              {emberIcons[i % emberIcons.length]}
            </span>
          ))}
        </div>
      </div>
      
      <div className="form-content-area">
        <button className="back-btn" onClick={() => navigate('/register')}>← BACK</button>

        <div className="form-card">
          <h2 className="form-title">REGISTRATION: <span className="highlight">{eventTitle}</span></h2>
          <div className="title-underline"></div>
          
          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="Full_Name" placeholder="Your Name" required />
            </div>

            <div className="input-group">
              <label>College Name</label>
              <input type="text" name="College" placeholder="Your College" required />
            </div>

            <div className="grid-inputs">
              <div className="input-group">
                <label>RGUHS Register Number</label>
                <input type="text" name="Reg_No" placeholder="Reg No." required />
              </div>
              <div className="input-group">
                <label>Year of Study</label>
                <select name="Year" required className="dark-select">
                  <option value="" disabled selected>Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="Phone" placeholder="Phone Number" required />
            </div>

            <div className="input-group">
              <label>UPI Transaction ID / UTR Number</label>
              <input 
                type="text" 
                name="Transaction_ID" 
                placeholder="12-digit UPI / UTR ID" 
                required 
              />
            </div>

            <div className="payment-box-glass">
              <div className="amount-row">
                <span>Total Amount:</span>
                <span className="price-tag">₹{totalPrice}</span>
              </div>
              
              <div className="qr-container">
                <p className="helper-text">Scan QR to pay for {eventTitle}</p>
                <div className="qr-image-wrapper">
                  <img src={selectedQR} alt="QR Code" className="payment-qr-img" />
                </div>
                
                <label 
                   htmlFor="screenshot" 
                   className={`custom-file-upload ${fileName ? 'file-selected' : ''}`}
                >
                  {fileName ? "✔ Screenshot Attached" : "Upload Payment Screenshot"}
                </label>
                <input 
                   type="file" 
                   id="screenshot" 
                   name="Screenshot" 
                   accept="image/*" 
                   hidden 
                   required 
                   onChange={handleFileChange}
                />
                
                {fileName && <p className="file-name-display">Selected: {fileName}</p>}
              </div>
            </div>

            <button type="submit" className="final-submit-btn" disabled={loading}>
              {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;