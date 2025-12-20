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

<p>Click on the events to select them.</p>


export default function RegisterPage() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [cart, setCart] = useState([]);
  const [processingId, setProcessingId] = useState(null);
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

  // --- UPDATED NAVIGATION LOGIC ---
  const handlePayNow = (categoryId) => {
    const eventCategory = events.find((e) => e.id === categoryId);
    const itemsInCat = cart.filter((item) => item.categoryId === categoryId);
    const subtotal = itemsInCat.reduce((s, i) => s + i.fee, 0);

    setProcessingId(categoryId);

    setTimeout(() => {
      // Navigates to the form and passes the event name and total price via State
      navigate(`/form/${categoryId}`, { 
        state: { 
          eventTitle: eventCategory.main, 
          totalPrice: subtotal,
          selectedItems: itemsInCat.map(i => i.name)
        } 
      });
      setProcessingId(null);
    }, 1000);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.fee, 0);

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

      {processingId && (
        <div className="payment-overlay">
          <div className="spinner"></div>
          <p>PREPARING FORM FOR {events.find(e => e.id === processingId)?.main}...</p>
        </div>
      )}

      <header className="main-header">
        <h1 className="main-title">MAGNUS 2.0</h1>
        <div className="title-underline"></div>
      </header>

      <section style={{ width: '100%', maxWidth: '900px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
  <div className="description-card-glass" style={{ textAlign: 'left', display: 'block', padding: '30px' }}>
    <h3 style={{ color: '#ff6600', marginBottom: '25px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', fontSize: '1.4rem' }}>
      INSTRUCTIONS FOR REGISTRATION
    </h3>
    
    {/* Use a Column Flexbox to stack the rows */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
      
      {[
        { num: 1, title: "Select Events:", text: "Choose your preferred events from the categories below. You can select multiple events across different categories." },
        { num: 2, title: "Review Basket:", text: "Check your active baskets on the right (or bottom on mobile) to see your total fees." },
        { num: 3, title: "Payment:", text: "Click \"Pay Now\" for a category. Each category has a specific QR code. Please ensure you scan the correct one." },
        { num: 4, title: "Verification:", text: "After payment, enter your 12-digit UTR/Transaction ID and upload a screenshot of the successful payment." },
        { num: 5, title: "Confirmation:", text: "Once submitted, our team will verify your transaction against the UTR provided and confirm your slot." }
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
            <strong>{item.title}</strong> {item.text}
          </p>
        </div>
      ))}

    </div>

    {/* FIXED NOTE ALIGNMENT */}
    <div className="warning-note-banner" style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'flex-start', 
      gap: '15px', marginTop: '35px', background: 'rgba(255, 170, 0, 0.1)', 
      borderLeft: '4px solid #ffaa00', padding: '15px', borderRadius: '4px' 
    }}>
      <span style={{ fontSize: '1.2rem' }}>⚠️</span>
      <p style={{ margin: 0, textAlign: 'left', color: '#ffaa00', fontWeight: '500', fontSize: '0.95rem' }}>
        Note: Keep the payment screenshot safe until the event date for physical verification if required.
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

        <aside className="baskets-column" id="cart-view">
          <h3 className="sidebar-label">ACTIVE BASKETS</h3>
          <div className="baskets-wrapper">
            {events.map((cat) => {
              const itemsInCat = cart.filter((item) => item.categoryId === cat.id);
              if (itemsInCat.length === 0) return null;
              const subtotal = itemsInCat.reduce((s, i) => s + i.fee, 0);

              return (
                <div key={cat.id} className="basket-card">
                  <div className="basket-header">{cat.main}</div>
                  <div className="basket-items">
                    {itemsInCat.map((item, idx) => (
                      <div key={idx} className="basket-row">
                        <span>{item.name}</span>
                        <span>₹{item.fee}</span>
                      </div>
                    ))}
                  </div>
                  <div className="basket-footer">
                    <div className="subtotal">Total: ₹{subtotal}</div>
                    <button className="pay-btn" onClick={() => handlePayNow(cat.id)}>PAY NOW</button>
                  </div>
                </div>
              );
            })}
            {cart.length === 0 && <div className="empty-basket-text">Baskets are currently empty.
            </div>}
          </div>

          {cart.length > 0 && (
            <div className="grand-total-section">
              <div className="total-line">
                <span>GRAND TOTAL</span>
                <span className="orange-text">₹{grandTotal}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}