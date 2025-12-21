import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import './RegisterPage.css';

const events = [
  { id: "cultural", main: "CULTURAL EVENTS", sub: [
    { name: "Solo dance classical", fee: 100 },
    { name: "Solo dance non-classical", fee: 100 },
    { name: "Duet dance", fee: 200 },
    { name: "Trio dance", fee: 300 },
    { name: "Reflections", fee: 200 },
    { name: "Face off", fee: 100 },
    { name: "Group dance", fee: 800 },
    { name: "Solo singing classical", fee: 100 },
    { name: "Solo singing non-classical", fee: 100 },
    { name: "Duet singing", fee: 100 },
    { name: "Fashion Show", fee: 800 },
    { name: "Reel making competition", fee: 50 },
  ]},
  { id: "literary", main: "LITERARY EVENTS", sub: [
    { name: "Debate", fee: 200 },
    { name: "Pick and Speak", fee: 100 },
    { name: "Fiction Fusion", fee: 50 },
    { name: "Shipwreck", fee: 100 },
    { name: "Spell Bee", fee: 100 },
    { name: "Word Building", fee: 150 },
    { name: "Handwriting", fee: 50 },
    { name: "Poetry", fee: 100 },
    { name: "Love Letter Writing", fee: 50 },
  ]},
  { id: "scientific", main: "SCIENTIFIC EVENTS", sub: [
    { name: "Research Presentation", fee: 500 },
    { name: "Case chronicles", fee: 200 },
    { name: "Pre clinical Quiz", fee: 200 },
    { name: "Diagnostic Blueprint", fee: 300 },
    { name: "Murder Mystery", fee: 250 },
    { name: "Dumb Charades", fee: 200 },
    { name: "Shark Tank", fee: 200 },
  ]},
  { id: "arts-sports", main: "ARTS & SPORTS", sub: [
    { name: "Painting", fee: 100 },
    { name: "Mehendi", fee: 50 },
    { name: "Rangoli", fee: 50 },
    { name: "Net Quiz", fee: 300 },
    { name: "Improv", fee: 200 },
    { name: "Basketball (M&W)", fee: 3000 },
    { name: "Futsal (M)", fee: 1200 },
    { name: "Badminton (M&W)", fee: 2000 },
    { name: "Chess (M&W)", fee: 1700 },
    { name: "Volleyball (M)", fee: 1500 },
    { name: "Kabaddi (M)", fee: 1200 },
    { name: "Throwball (M&W)", fee: 1500 },
  ]},
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [cart, setCart] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState(null);

  const emberIcons = ["🏀", "⚽", "🎸", "🎤", "🧪", "🎨", "🎭", "🏸", "📖", "🩺"];

  const toggleDropdown = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleToggleItem = (categoryId, categoryName, item) => {
    const isPresent = cart.find((c) => c.name === item.name);
    if (isPresent) {
      setCart(cart.filter((c) => c.name !== item.name));
    } else {
      setCart([...cart, { ...item, categoryId, categoryName }]);
      setAlert(`${item.name} added!`);
      setTimeout(() => setAlert(null), 2500);
    }
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.fee, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      navigate(`/form/all-access`, { 
        state: { 
          eventTitle: "MAGNUS 2.0 REGISTRATION", 
          totalPrice: grandTotal,
          selectedItems: cart 
        } 
      });
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="register-container">
      {/* BACKGROUND ELEMENTS */}
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

      <button className="back-btn" onClick={() => navigate("/")}>← BACK</button>
      {alert && <div className="toast-alert">{alert}</div>}
      
      {processing && (
        <div className="payment-overlay">
          <div className="spinner"></div>
          <p>PREPARING YOUR REGISTRATION...</p>
        </div>
      )}

      <header className="main-header">
        <h1 className="main-title">MAGNUS 2.0</h1>
        <div className="title-underline"></div>
      </header>

      {/* UPDATED INSTRUCTIONS SECTION */}
      <section style={{ width: '100%', maxWidth: '900px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div className="description-card-glass" style={{ textAlign: 'left', display: 'block', padding: '30px' }}>
          <h3 style={{ color: '#ff6600', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', fontSize: '1.4rem' }}>
            REGISTRATION INSTRUCTIONS
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
            {[
              { num: 1, title: "Pick Your Events:", text: "Open the categories below and click on any event to add it to your basket. You can choose as many as you like." },
              { num: 2, title: "Review Total:", text: "Check 'YOUR BASKET' on the right. It automatically calculates the combined fee for all your selections." },
              { num: 3, title: "Unified Payment:", text: "Click 'CHECKOUT & PAY'. You only need to make ONE payment for all selected events using the QR code on the next page." },
              { num: 4, title: "Enter Details:", text: "Fill in your personal info and provide the 12-digit UTR/Transaction ID from your payment app." },
              { num: 5, title: "Get Your Ticket:", text: "Once you submit, an All-Access ticket will be generated listing every event you registered for. Save it as a PDF." }
            ].map((item) => (
              <div key={item.num} style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: '15px', width: '100%', alignItems: 'start' }}>
                <div className="number-circle" style={{ 
                  background: '#ff6600', color: '#000', width: '26px', height: '26px', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '3px' 
                }}>
                  {item.num}
                </div>
                <p style={{ margin: 0, textAlign: 'left', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5', fontSize: '1rem' }}>
                  <strong style={{ color: '#fff' }}>{item.title}</strong> {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="warning-note-banner" style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', 
            gap: '15px', marginTop: '35px', background: 'rgba(255, 170, 0, 0.1)', 
            borderLeft: '4px solid #ffaa00', padding: '15px', borderRadius: '4px' 
          }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <p style={{ margin: 0, textAlign: 'left', color: '#ffaa00', fontWeight: '500', fontSize: '0.9rem' }}>
              Important: Ensure the total amount paid matches the Grand Total in your basket before submitting.
            </p>
          </div>
        </div>
      </section>

      <div className="main-grid">
        <section className="events-column">
          <div className="accordion">
            {events.map((event) => {
              const isOpen = openId === event.id;
              const count = cart.filter((c) => c.categoryId === event.id).length;

              return (
                <div key={event.id} className={`event-block ${isOpen ? "open" : ""}`}>
                  <div className="event-trigger" onClick={() => toggleDropdown(event.id)}>
                    <div className="trigger-left">
                      <span className={`badge ${count > 0 ? "active" : ""}`}>{count}</span>
                      <h2>{event.main}</h2>
                    </div>
                    <div className={`arrow ${isOpen ? "rotate" : ""}`}></div>
                  </div>

                  <div className={`dropdown-content ${isOpen ? "visible" : ""}`}>
                    <div className="item-grid">
                      {event.sub.map((sub, i) => {
                        const isSelected = cart.some((c) => c.name === sub.name);
                        return (
                          <div
                            key={i}
                            className={`event-card ${isSelected ? "selected" : ""}`}
                            onClick={() => handleToggleItem(event.id, event.main, sub)}
                          >
                            <span className="event-name">{sub.name}</span>
                            <span className="event-fee">₹{sub.fee}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="baskets-column">
          <h3 className="sidebar-label">YOUR BASKET</h3>
          <div className="baskets-wrapper">
            {cart.length > 0 ? (
              <div className="basket-card">
                <div className="basket-header">SELECTED EVENTS</div>
                <div className="basket-items">
                  {cart.map((item, idx) => (
                    <div key={idx} className="basket-row">
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span>{item.name}</span>
                        <small style={{fontSize: '0.7rem', color: '#ff6600', textTransform: 'uppercase'}}>{item.categoryName}</small>
                      </div>
                      <span>₹{item.fee}</span>
                    </div>
                  ))}
                </div>
                <div className="grand-total-section">
                   <div className="total-line">
                     <span>GRAND TOTAL</span>
                     <span className="orange-text">₹{grandTotal}</span>
                   </div>
                   <button className="pay-btn" onClick={handleCheckout} style={{width: '100%', marginTop: '15px'}}>
                     CHECKOUT & PAY
                   </button>
                </div>
              </div>
            ) : (
              <div className="empty-basket-text">Baskets are currently empty.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}