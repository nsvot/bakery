import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file

// Mock product data
const productData = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    description: "Rich chocolate cake with decadent frosting",
    price: 35.99,
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Veg Burger",
    description: "Properly Made burger with veggies and tomato kethup",
    price: 28.50,
    image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Fish Fry",
    description: "Soft red Fish with cream cheese frosting",
    price: 40.75,
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Boiled Egg",
    description: "Boiled eggs with Veggies",
    price: 23.75,
    image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Maccaroni Pizza",
    description: "Crispy Crust maccoroni pizza",
    price: 13.75,
    image: "https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Donuts",
    description: "Fresh Donuts with multiple flavours",
    price: 10.75,
    image: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=600"
  },


];

// Main App Component
function App() {
  return (
    <Router>
      <div className="body">
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand-name">
          Sweet Treats Bakery
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="heading">Welcome to Sweet Treats Bakery</h1>
        <p className="subheading">Handcrafted Delights Baked Fresh Daily</p>
        <div className="product-grid">
          {productData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card">
        <img 
          src={product.image} 
          alt={product.name}
          className="card-img"
        />
        <div className="card-content">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description}</p>
          <div className="card-footer">
            <span className="card-price">${product.price.toFixed(2)}</span>
            <button 
              onClick={() => setShowModal(true)}
              className="order-btn"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <OrderModal 
          product={product} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}

// Order Modal Component
function OrderModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement order submission logic
    alert(`Ordered ${quantity} ${product.name}`);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button 
          onClick={onClose} 
          className="close-btn"
        >
          &times;
        </button>
        <h2 className="modal-title">Order {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1" 
              className="form-input"
            />
          </div>
          <button 
            type="submit" 
            className="form-submit"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="container">
      <div className="text-center">
        <h2 className="subheading">Our Story</h2>
        <p className="about-text">
          Sweet Treats Bakery was founded in 2010 with a passion for creating 
          delicious, high-quality baked goods. Our team of expert bakers uses 
          only the finest ingredients to craft memorable treats for our community.
        </p>
      </div>
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement contact form submission logic
    alert('Message sent!');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="subheading">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea 
              rows={3} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="form-input"
            />
          </div>
          <button 
            type="submit" 
            className="form-submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2024 Sweet Treats Bakery. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

// Routing Component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
