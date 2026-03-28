import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth.js';
import { signOut } from '../features/auth/services/auth.api.js';
import '../features/shared/styles/landing.scss';

export default function Landing() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleExploreFeed = () => {
    navigate('/feed');
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="landing-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h2 className="logo">Clipzy</h2>
          </div>
          <div className="nav-links">
            {!user ? (
              <div className="auth-nav-buttons">
                <button className="nav-btn-secondary" onClick={() => navigate('/signin')}>
                  Sign In
                </button>
                <button className="nav-btn-primary" onClick={() => navigate('/signup')}>
                  Join Now
                </button>
              </div>
            ) : (
              <div className="nav-actions">
                <button className="nav-explore-btn" onClick={handleExploreFeed} title="Go to Feed">
                  📸 Explore Feed
                </button>
                <div className="nav-user-menu" ref={menuRef}>
                  <button
                    ref={buttonRef}
                    className="nav-profile-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    title={user?.fullName}
                  >
                    <img src={user?.profilePicture} alt={user?.fullName} />
                  </button>
                  {showUserMenu && (
                    <div className="nav-dropdown">
                      <div className="nav-profile-card">
                        <img src={user?.profilePicture} alt={user?.fullName} />
                        <div className="nav-profile-info">
                          <h4>{user?.fullName}</h4>
                          <p>@{user?.username}</p>
                        </div>
                      </div>
                      <div className="nav-divider"></div>
                      <button className="nav-logout-btn" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="landing-container">
        {/* Animated Background Elements */}
        <div className="bg-elements">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title logo">
              Clipzy
            </h1>
            <p className="hero-subtitle">
              Share your creative vision with the world. Discover, create, and connect with a vibrant community of creators.
            </p>
            <div className="hero-cta">
              <button
                className="btn-primary"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleExploreFeed()}
              >
                Explore Feed
              </button>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="arrow-wrapper">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="scroll-text">Scroll to explore</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">Why Choose Clipzy?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>Create Effortlessly</h3>
              <p>Share your moments and ideas with an intuitive, user-friendly creation process.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>Connect & Engage</h3>
              <p>Build meaningful connections with creators who share your interests and passions.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>Discover Creativity</h3>
              <p>Explore content from passionate creators and find inspiration for your next project.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>Community First</h3>
              <p>Join a supportive community that celebrates creativity and encourages growth.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Share Your Story?</h2>
          <p>Join thousands of creators already using Clipzy to share their passion.</p>
          <button
            className="btn-primary-lg"
            onClick={() => navigate('/signup')}
          >
            Start Creating Today
          </button>
        </section>
      </div>
    </>
  );
}
