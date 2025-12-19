import { useState } from "react";
import "./RegisterPage.css";

const events = [
  {
    id: "cultural",
    main: "CULTURAL EVENTS",
    // Replace with your actual Google Form Link
    formLink: "https://forms.gle/your-cultural-form-link",
    sub: [
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
    ],
  },
  {
    id: "literary",
    main: "LITERARY EVENTS",
    // Replace with your actual Google Form Link
    formLink: "https://forms.gle/your-literary-form-link",
    sub: [
      { name: "Debate", fee: 200 },
      { name: "Pick and Speak", fee: 100 },
      { name: "Fiction Fusion", fee: 50 },
      { name: "Shipwreck", fee: 100 },
      { name: "Spell Bee", fee: 100 },
      { name: "Word Building", fee: 150 },
      { name: "Handwriting", fee: 50 },
      { name: "Poetry", fee: 100 },
      { name: "Love Letter Writing", fee: 50 },
    ],
  },
  {
    id: "scientific",
    main: "SCIENTIFIC EVENTS",
    // Replace with your actual Google Form Link
    formLink: "https://forms.gle/your-scientific-form-link",
    sub: [
      { name: "Research Presentation", fee: 500 },
      { name: "Case chronicles", fee: 200 },
      { name: "Pre clinical Quiz", fee: 200 },
      { name: "Diagnostic Blueprint", fee: 300 },
      { name: "Murder Mystery", fee: 250 },
      { name: "Dumb Charades", fee: 200 },
      { name: "Shark Tank", fee: 200 },
    ],
  },
  {
    id: "arts-sports",
    main: "ARTS & INFORMAL + SPORTS",
    // Replace with your actual Google Form Link
    formLink: "https://forms.gle/your-sports-form-link",
    sub: [
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
    ],
  },
];

export default function RegisterPage() {
  const [openId, setOpenId] = useState(null);
  const [cart, setCart] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleToggleItem = (categoryId, categoryName, item) => {
    const isPresent = cart.find((c) => c.name === item.name);
    if (isPresent) {
      setCart(cart.filter((c) => c.name !== item.name));
    } else {
      setCart([...cart, { ...item, categoryId, categoryName }]);
    }
  };

  const handlePayNow = (categoryId) => {
    const eventCategory = events.find((e) => e.id === categoryId);
    
    setProcessingId(categoryId);

    // Simulate a brief secure connection check before redirecting
    setTimeout(() => {
      window.open(eventCategory.formLink, "_blank");
      
      // Clear items from the cart for this category after "paying"
      setCart(cart.filter((item) => item.categoryId !== categoryId));
      setProcessingId(null);
    }, 1000);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.fee, 0);

  return (
    <div className="register-container">
      {processingId && (
        <div className="payment-overlay">
          <div className="spinner"></div>
          <p>REDIRECTING TO SECURE PAYMENT...</p>
        </div>
      )}

      <div className="orange-glow"></div>

      <header className="main-header">
        <h1 className="main-title">MAGNUS 2.0</h1>
        <div className="title-underline"></div>
      </header>

      <div className="main-grid">
        {/* LEFT SECTION: EVENT CATEGORIES ACCORDION */}
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

        {/* RIGHT SECTION: INDEPENDENT BASKETS */}
        <aside className="baskets-column">
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
                    <button className="pay-btn" onClick={() => handlePayNow(cat.id)}>
                      PAY NOW
                    </button>
                  </div>
                </div>
              );
            })}

            {cart.length === 0 && (
              <div className="empty-basket-text">Baskets are currently empty.</div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="grand-total-section">
              <div className="total-line">
                <span>GRAND TOTAL DUE</span>
                <span className="orange-text">₹{grandTotal}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}