import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventForm.css'; 

const VisitorForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);

  // Hardcoded Configuration
  const VISITOR_QR = "/qr-main.png"; // Place your ₹50 QR image in the public folder

  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phone = formData.get("Phone");
    const transactionId = formData.get("Transaction_ID");

    if (phone.length !== 10) {
      alert("⚠️ Phone Number must be exactly 10 digits.");
      return; 
    }
    if (transactionId.length !== 12) {
      alert("⚠️ Transaction ID / UTR must be exactly 12 digits.");
      return; 
    }

    setLoading(true);

    // Hardcoding data for Google Sheets
    formData.append("Total_Amount", "50");
    formData.append("Visiting_Days", "3 Days");
    formData.append("Event_Category", "Visitor Pass (3 Days)");

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxjQuiGE5I1pQiwP2XOA8Q3EVC9_jGuX8oPbvNUNfVTppCpTXOboIfX28pLBRJOH8IY/exec'; 
      await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
      
      setUserData(Object.fromEntries(formData.entries()));
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Submission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted && userData) {
    return (
      <div className="register-container form-page-layout">
        <FireBackground />
        <div className="form-content-area ticket-view">
          <div className="ticket-card">
            <div className="ticket-header">
              <h2 className="form-title highlight">VISITOR PASS</h2>
              <div className="ticket-badge">3 DAYS ENTRY - ₹50</div>
            </div>

            <div className="ticket-body">
              <div className="ticket-grid">
                <div className="t-item"><span>NAME</span><p>{userData.Full_Name}</p></div>
                <div className="t-item"><span>COLLEGE</span><p>{userData.College}</p></div>
              </div>

              <div className="ticket-grid" style={{marginTop: '15px'}}>
                <div className="t-item"><span>REG NO.</span><p>{userData.Reg_No}</p></div>
                <div className="t-item"><span>PHONE</span><p>{userData.Phone}</p></div>
              </div>

              <div className="utr-box" style={{marginTop: '20px'}}>
                <span>TRANSACTION ID / UTR</span>
                <p className="utr-number">{userData.Transaction_ID}</p>
              </div>
            </div>

            <div className="ticket-footer" style={{ marginTop: '30px' }}>
                <button className="final-submit-btn" onClick={() => window.print()}>SAVE AS PDF</button>
                <button className="back-btn" onClick={() => navigate('/')} style={{ marginTop: '10px', width: '100%', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px', borderRadius: '8px' }}>BACK TO HOME</button>
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
        <button className="back-btn" onClick={() => navigate('/')}>← BACK</button>
        <div className="form-card">
          <h2 className="form-title">VISITOR <span className="highlight">PASS</span></h2>
          <p style={{textAlign:'center', color:'#ff4d00', marginBottom:'20px', fontWeight: 'bold'}}>₹50 FOR 3 DAYS (NON-PARTICIPANTS)</p>
          
          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="Full_Name" placeholder="Enter your name" required />
            </div>

            <div className="input-group">
              <label>College Name</label>
              <input type="text" name="College" placeholder="Enter college name" required />
            </div>

            <div className="grid-inputs">
              <div className="input-group">
                <label>Register Number</label>
                <input type="text" name="Reg_No" placeholder="College ID" required />
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
              <label>UTR / Transaction ID (12 Digits)</label>
              <input 
                type="text" 
                name="Transaction_ID" 
                placeholder="Enter 12-digit UTR number"
                required 
                maxLength="12" 
                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              />
            </div>

            <div className="payment-box-glass">
              <div className="amount-header">
                <span>Pass Fee (3 Days):</span>
                <span className="total-price-display">₹50</span>
              </div>
              <div style={{background: 'white', padding: '10px', borderRadius: '10px', width: 'fit-content', margin: '15px auto'}}>
                <img src={VISITOR_QR} alt="50 Rupees QR" style={{ width: '150px', display: 'block' }} />
              </div>
              <p style={{fontSize: '11px', textAlign: 'center', opacity: 0.7}}>Scan and pay exactly ₹50</p>
            </div>

            <button type="submit" className="final-submit-btn" disabled={loading}>
              {loading ? "PROCESSING..." : "GET VISITOR PASS"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorForm;