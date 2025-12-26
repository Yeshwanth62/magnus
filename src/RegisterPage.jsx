import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import './RegisterPage.css';

const events = [
  { id: "cultural", main: "CULTURAL EVENTS", sub: [
    { name: "Solo dance classical ", fee: 100 },
    { name: "Solo dance non-classical ", fee: 100 },
    { name: "Duet dance ", fee: 200 },
    { name: "Trio dance ", fee: 300 },
    { name: "Reflections ", fee: 200 },
    { name: "Face off ", fee: 100 },
    { name: "Group dance ", fee: 800 },
    { name: "Solo singing classical ", fee: 100 },
    { name: "Solo singing non-classical ", fee: 100 },
    { name: "Duet singing ", fee: 100 },
    { name: "Fashion Show ", fee: 800 },
    { name: "Reel making competition ", fee: 50 },
    { name: "Mono Acting ", fee: 100 },
  ]},
  { id: "literary", main: "LITERARY EVENTS", sub: [
    { name: "Ultimate Litpass ", fee: 900 },
    { name: "Litpass(English events) ", fee: 600 },
    { name: "Litpass(Kannada events) ", fee: 350 },
    { name: "Net Quiz ", fee: 200 },
    { name: "Rasamanjari ", fee: 150 },
    { name: "Debate ", fee: 200 },
    { name: "Debate(Kannada) ", fee: 200 },
    { name: "Fiction Fusion ", fee: 50 },
    { name: "Fiction Fusion(Kannada) ", fee: 50 },
    { name: "Pick and Speak ", fee: 100 },
    { name: "Pick and Speak(Kannada) ", fee: 100 },
    { name: "Handwriting ", fee: 50 },
    { name: "Handwriting(Kannada) ", fee: 50 },
    { name: "Love Letter Writing ", fee: 50 },
    { name: "Love Letter Writing(Kannada) ", fee: 50 },
    { name: "Shipwreck ", fee: 100 },
    { name: "Spell Bee ", fee: 100 },
    { name: "Word Building ", fee: 100 },
    { name: "Poetry ", fee: 100 },
  ]},
  { id: "scientific", main: "SCIENTIFIC EVENTS", sub: [
    { name: "Research Presentation(on spot registration) ", fee: 0 },
    { name: "Case chronicles ", fee: 200 },
    { name: "Pre clinical Quiz ", fee: 200 },
    { name: "Diagnostic Blueprint ", fee: 200 },
    { name: "Murder Mystery ", fee: 200 },
    { name: "Dumb Charades ", fee: 150 },
    { name: "Shark Tank ", fee: 150 },
  ]},
  { id: "arts-sports", main: "ARTS & SPORTS", sub: [
    { name: "Painting", fee: 100 },
    { name: "Photography", fee: 100 },
    { name: "Improv", fee: 150 },
    { name: "Basketball (M)", fee: 1200 },
    { name: "Basketball (W)", fee: 1200 },
    { name: "Futsal (M)", fee: 1000 },
    { name: "Badminton (M)", fee: 1000 },
    { name: "Badminton (W)", fee: 1000 },
    {name: "Chess pass", fee: 500 },
    { name: "Chess (Classic)(M&W)", fee: 300 },
    { name: "Chess (Rapid)(M&W)", fee: 200 },
    { name: "Chess (Blitz)(M&W)", fee: 200 },
    { name: "Chess (Team Rapid)(M&W)", fee: 900 },
    { name: "Volleyball (M)", fee: 1200 },
    { name: "Kabaddi (M)", fee: 1000 },
    { name: "Throwball (M)", fee: 1000 },
    { name: "Throwball (W)", fee: 1000 },
    { name: "Table Tennis (M)", fee: 600 },
    { name: "Table Tennis (W)", fee: 600 },
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
    // --- EDITED: BLOCK FREE EVENTS FROM CART ---
    if (item.fee === 0) {
      setAlert(`${item.name} is a FREE event! No payment required.`);
      setTimeout(() => setAlert(null), 3000);
      return; 
    }

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
              { num: 5, title: "Acknowledgement:", text: "Once you submit , an acknowledgement form will be generated." },
              { num: 6, title: "Ticket:", text: "An E ticket of your registration will be sent to you via WhatsApp shortly after your registration." }
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
                        // --- EDITED: CHECK IF FREE FOR UI ---
                        const isFree = sub.fee === 0;

                        return (
                          <div
                            key={i}
                            className={`event-card ${isSelected ? "selected" : ""} ${isFree ? "free-card" : ""}`}
                            onClick={() => handleToggleItem(event.id, event.main, sub)}
                          >
                            <span className="event-name">{sub.name}</span>
                            {/* --- EDITED: DISPLAY "FREE" TEXT --- */}
                            <span className="event-fee">{isFree ? "FREE" : `₹${sub.fee}`}</span>
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