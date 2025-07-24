import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../styles/Navbar.css';

function Navbar() {
  const { cart } = useCart();
  const { token, setToken, user } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setToken(null);
    toast.info('👋 Logged out');
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo">🛍️ SimpleStore</span>
        </div>

        {/* Search bar (desktop only) */}
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
              type="button"
            >
              ❌
            </button>
          )}
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>

        {/* Desktop menu */}
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>

          {token && (
            <Link to="/orders">📦 My Orders</Link>
          )}

          {token && user?.role === 'admin' && (
            <>
              <Link to="/admin/add-product">➕ Add Product</Link>
              <Link to="/admin/dashboard">📊 Dashboard</Link>
            </>
          )}

          {!token ? (
            <>
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                Login
              </button>
              <button className="register-btn" onClick={() => setShowRegisterModal(true)}>
                Register
              </button>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button
          className="close-btn"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close Menu"
        >
          ×
        </button>

        <Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link>
        <Link to="/cart" onClick={() => setIsSidebarOpen(false)}>
          🛒 Cart ({cartCount})
        </Link>

        {token && (
          <Link to="/orders" onClick={() => setIsSidebarOpen(false)}>
            📦 My Orders
          </Link>
        )}

        {token && user?.role === 'admin' && (
          <>
            <Link to="/admin/add-product" onClick={() => setIsSidebarOpen(false)}>
              ➕ Add Product
            </Link>
            <Link to="/admin/dashboard" onClick={() => setIsSidebarOpen(false)}>
              📊 Dashboard
            </Link>
          </>
        )}

        {!token ? (
          <>
            <button
              onClick={() => {
                setShowLoginModal(true);
                setIsSidebarOpen(false);
              }}
            >
              🔐 Login
            </button>
            <button
              onClick={() => {
                setShowRegisterModal(true);
                setIsSidebarOpen(false);
              }}
            >
              📝 Register
            </button>
          </>
        ) : (
          <button onClick={handleLogout}>🚪 Logout</button>
        )}
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </>
  );
}

export default Navbar;
