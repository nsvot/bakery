import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file
import ChocolateCookies from "./images/chocolate_cookies.jpg"
import CupCake from "./images/cup_cake.jpg"
import Sandwich from "./images/sandwich.jpg"
import GarlicBread from "./images/garlic_bread.jpg"
import Cake from "./images/cake.jpg"
// Mock product data
const productData = [
  {
    id: 1,
    name: "Pan Cake",
    description: "Rich chocolate cake with decadent frosting",
    price: 35.99,
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Chocolate Cookies",
    description: "Properly Made Cookies with chocolate.",
    price: 28.50,
    image: ChocolateCookies
  },
  {
    id: 3,
    name: "Cup Cake",
    description: "Soft cup cake with cream cheese frosting",
    price: 40.75,
    image: CupCake
  },
  {
    id: 4,
    name: "Sandwich",
    description: "Sandwich with Veggies and freash bread.",
    price: 23.75,
    image:Sandwich
  },
  {
    id: 5,
    name: "Garlic Bread",
    description: "Crispy Crust Garlic Bread",
    price: 13.75,
    image: GarlicBread
  },
  {
    id: 6,
    name: "Cake",
    description: "Fresh Cake with chocolate flavours",
    price: 20,
    image:Cake
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

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand-name">
          Sweet Treats Bakery
        </Link>
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="nav-link" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
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
