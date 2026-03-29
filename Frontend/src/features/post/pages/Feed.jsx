import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { signOut } from '../../auth/services/auth.api.js';
import '../../shared/styles/_logo.scss';
import CreatePost from '../components/CreatePost.jsx';
import Post from '../components/Post.jsx';
import { useFeed } from '../hooks/useFeed.js';
import '../styles/feed.scss';

const Feed = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { loading, feed, fetchFeed, error, feedType, switchFeedType } = useFeed();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    fetchFeed();
  }, [user]);

  // Calculate menu position when opening
  useEffect(() => {
    if (showUserMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8
      });
    }
  }, [showUserMenu]);

  // Close menu when clicking outside
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

  const handlePostCreated = () => {
    setShowCreatePost(false);
    fetchFeed();
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
    setShowUserMenu(false);
  };

  if (loading) {
    return <div className="loading">Loading feed...</div>
  };

  return (
    <div className="feed">
      <header className="feed-header">
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <h2 className="logo">Clipzy</h2>
            </div>
            {!user ? (
              <div className="auth-buttons">
                <button className="btn-secondary" onClick={() => navigate('/signin')}>
                  Sign In
                </button>
                <button className="btn-primary" onClick={() => navigate('/signup')}>
                  Join Now
                </button>
              </div>
            ) : (
              <div className="header-actions">
                <button
                  className="create-post-btn"
                  onClick={() => setShowCreatePost(true)}
                  aria-label="Create new post"
                  title="Create new post"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
                  </svg>
                  Create Post
                </button>
                <div className="user-menu-wrapper" ref={menuRef}>
                  <button
                    ref={buttonRef}
                    className="profile-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    aria-label="User menu"
                    title={user?.fullName}
                  >
                    <img src={user?.profilePicture} alt={user?.fullName} />
                  </button>
                  {showUserMenu && (
                    <div className="user-menu-dropdown" style={{ top: `${menuPosition.top}px` }}>
                      <div className="profile-card">
                        <img src={user?.profilePicture} alt={user?.fullName} className="profile-image" />
                        <div className="profile-info">
                          <h3 className="profile-name">{user?.fullName}</h3>
                          <p className="profile-username">@{user?.username}</p>
                          <p className="profile-bio">{user?.bio || 'No bio added yet'}</p>
                        </div>
                        <button
                          className="view-profile-btn"
                          onClick={handleViewProfile}
                          aria-label="View your profile"
                        >
                          View Profile
                        </button>
                      </div>
                      <div className="menu-divider"></div>
                      <button
                        className="menu-item logout-item"
                        onClick={handleLogout}
                        aria-label="Logout"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {user ? (
            <div className="feed-type-toggle">
              <button
                className={`toggle-btn ${feedType === 'discover' ? 'active' : ''}`}
                onClick={() => switchFeedType('discover')}
                title="Discover posts from all creators"
              >
                🌍 Discover
              </button>
              <button
                className={`toggle-btn ${feedType === 'following' ? 'active' : ''}`}
                onClick={() => switchFeedType('following')}
                title="Posts from creators you follow"
              >
                📸 Following
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {user && showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} onPostCreated={handlePostCreated} />
      )}

      <main className="feed-main">
        <div className="feed-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : feed.length === 0 ? (
            <div className="no-posts">
              {feedType === 'following'
                ? 'No posts to show. Follow some creators to see their posts here!'
                : 'No posts yet. Be the first to share something amazing!'}
            </div>
          ) : (
            feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
      </main>
    </div>
  )
}

export default Feed
