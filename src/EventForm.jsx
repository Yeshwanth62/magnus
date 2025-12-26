import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterPage.css'; 
import './EventForm.css';

const EventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);

  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];
  
  const { totalPrice, selectedItems } = location.state || { totalPrice: 0, selectedItems: [] };

  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      navigate('/register');
    }
  }, [selectedItems, navigate]);

  const MAIN_QR = "/qr-main.png"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- ADDED MANUAL VALIDATION LOGIC ---
    const formData = new FormData(e.target);
    const phone = formData.get("Phone");
    const transactionId = formData.get("Transaction_ID");

    if (phone.length !== 10) {
      alert("⚠️ Phone Number must be exactly 10 digits.");
      return; // Stops the function here
    }

    if (transactionId.length !== 12) {
      alert("⚠️ Transaction ID / UTR must be exactly 12 digits.");
      return; // Stops the function here
    }
    // -------------------------------------

    setLoading(true);
    const eventNames = selectedItems.map(item => item.name).join(", ");
    
    formData.append("Total_Amount", totalPrice);
    formData.append("Registered_Events", eventNames);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzHs_ubhi9NhLNQz4NnUfEzUSEFwoF2ZuE0gEsoMZYZd8crdarmH4HjXKQ3qXajHjoG/exec'; 
      await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
      
      setUserData(Object.fromEntries(formData.entries()));
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission Error:', error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const FireBackground = () => (
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
  );

  if (isSubmitted && userData) {
    return (
      <div className="register-container form-page-layout">
        <FireBackground />
        <div className="form-content-area ticket-view">
          <div className="ticket-card">
            <div className="ticket-header">
              <h2 className="form-title highlight">REGISTRATION CONFIRMED</h2>
              <div className="ticket-badge">Acknowledgement 
               (Entry pass will be sent via WhatsApp)</div>
            </div>

            <div className="ticket-body">
              <div className="ticket-grid">
                <div className="t-item"><span>NAME</span><p>{userData.Full_Name}</p></div>
                <div className="t-item"><span>REG NO.</span><p>{userData.Reg_No}</p></div>
              </div>

              <div className="ticket-grid" style={{ marginTop: '10px' }}>
                <div className="t-item"><span>EMAIL</span><p style={{ textTransform: 'lowercase' }}>{userData.Email}</p></div>
                <div className="t-item"><span>COLLEGE</span><p>{userData.College}</p></div>
              </div>

              <div className="ticket-event-list-box">
                <label>REGISTERED EVENTS</label>
                <div className="event-pills-container">
                  {selectedItems.map((item, index) => (
                    <div key={index} className="event-pill">
                      <span className="pill-name">{item.name}</span>
                      <span className="pill-cat">{item.categoryName}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ticket-grid">
                <div className="t-item"><span>TOTAL PAID</span><p>₹{totalPrice}</p></div>
                <div className="t-item"><span>PHONE</span><p>{userData.Phone}</p></div>
              </div>

              <div className="utr-box">
                <span>TRANSACTION ID / UTR</span>
                <p className="utr-number">{userData.Transaction_ID}</p>
              </div>
            </div>

            <div className="ticket-footer ticket-btns" style={{ marginTop: '40px' }}>
              <div className="ticket-action-btns" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button className="final-submit-btn" onClick={() => window.print()}>SAVE AS PDF</button>
                <button className="back-btn" onClick={() => navigate('/')} style={{ border: 'none', background: 'rgba(255,255,255,0.05)' }}>BACK TO HOME</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container form-page-layout">
      <FireBackground />
      <div className="form-content-area">
        <button className="back-btn" onClick={() => navigate('/register')}>← BACK TO BASKET</button>
        
        <div className="form-card">
          <h2 className="form-title">COMPLETE <span className="highlight">REGISTRATION</span></h2>
          
          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="Full_Name" placeholder="Enter your full name" required />
            </div>

            <div className="input-group">
              <label>College Name</label>
              <input type="text" name="College" placeholder="Enter your college" required />
            </div>

            <div className="grid-inputs">
              <div className="input-group">
                <label>Register Number</label>
                <input type="text" name="Reg_No" placeholder="College ID/Reg No" required />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="Phone" 
                  placeholder="10-digit mobile" 
                  required 
                  maxLength="10"
                  onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="Email" placeholder="Enter your email id" required />
            </div>

            <div className="input-group">
              <label>Transaction ID / UTR Number</label>
              <input 
                type="text" 
                name="Transaction_ID" 
                placeholder="12-digit UTR number" 
                required 
                maxLength="12"
                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              />
            </div>

            <div className="payment-box-glass">
              <div className="amount-header">
                <span>Amount to Pay:</span>
                <span className="total-price-display">₹{totalPrice}</span>
              </div>
              
              <div className="qr-section">
                <div className="qr-wrapper">
                  <img src={MAIN_QR} alt="Payment QR" className="payment-qr-img" />
                </div>
              </div>
            </div>

            <button type="submit" className="final-submit-btn" disabled={loading}>
              {loading ? "PROCESSING..." : "CONFIRM & GENERATE TICKET"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;