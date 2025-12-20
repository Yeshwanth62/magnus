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
  const [isSubmitted, setIsSubmitted] = useState(false); // NEW: Track submission
  const [userData, setUserData] = useState(null); // NEW: Store data for ticket

  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];
  const { eventTitle, totalPrice } = location.state || { eventTitle: "Event", totalPrice: 0 };

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

    // Capture data for the ticket before sending
    const dataForTicket = Object.fromEntries(formData.entries());

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwGqTHoUoega_GuIeLIFVYVsJhqhHT3tyId0bjTPm5tcjtR3HHci7FFgRT-SDB1xHap/exec'; 
      
      await fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors' 
      });
      
      // Instead of an alert, show the ticket
      setUserData(dataForTicket);
      setIsSubmitted(true);
      window.scrollTo(0, 0); // Scroll to top to see the ticket
    } catch (error) {
      console.error('Submission Error:', error);
      alert("Something went wrong. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  // --- TICKET VIEW RENDER ---
  if (isSubmitted && userData) {
    return (
      <div className="register-container form-page-layout">
        <div className="fire-background">
            <div className="fire-aura"></div>
            <div className="fire-core"></div>
            <div className="fire-sparks">
            {[...Array(40)].map((_, i) => (
                <span key={i} className="event-ember" style={{ 
                    left: `${Math.random() * 100}%`, 
                    fontSize: `${Math.random() * (10 - 4) + 4}px`
                }}>
                {emberIcons[i % emberIcons.length]}
                </span>
            ))}
            </div>
        </div>

        <div className="form-content-area">
          <div className="ticket-card">
            <div className="ticket-header">
              <h2 className="form-title highlight">REGISTRATION CONFIRMED</h2>
              <div className="ticket-badge">MAGNUS 2.0 ENTRY PASS</div>
            </div>

            <div className="ticket-body">
              <div className="ticket-event-section">
                <label>REGISTERED FOR</label>
                <h3>{userData.Event_Category}</h3>
              </div>

              <div className="ticket-grid">
                <div className="t-item"><span>NAME</span><p>{userData.Full_Name}</p></div>
                <div className="t-item"><span>REG NO.</span><p>{userData.Reg_No}</p></div>
                <div className="t-item"><span>COLLEGE</span><p>{userData.College}</p></div>
                <div className="t-item"><span>AMOUNT PAID</span><p>₹{userData.Total_Amount}</p></div>
              </div>

              <div className="utr-box">
                <span>TRANSACTION ID / UTR</span>
                <p>{userData.Transaction_ID}</p>
              </div>

              <div className="verification-status">
                <div className="status-dot pulse"></div>
                <span>STATUS: PENDING VERIFICATION</span>
              </div>
            </div>

            <div className="ticket-footer">
              <p className="ticket-note">Please take a screenshot of this ticket for entry at the venue.</p>
              <div className="ticket-btns">
                <button className="final-submit-btn" onClick={() => window.print()}>SAVE AS PDF</button>
                <button className="back-btn" style={{marginTop: '10px'}} onClick={() => navigate('/')}>BACK TO HOME</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ORIGINAL FORM VIEW RENDER ---
  return (
    <div className="register-container form-page-layout">
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
                  <option value="" disabled defaultValue>Select Year</option>
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