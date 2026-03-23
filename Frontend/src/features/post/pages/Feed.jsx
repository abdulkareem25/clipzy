import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CreatePost from '../components/CreatePost.jsx';
import Post from '../components/Post.jsx';
import { useFeed } from '../hooks/useFeed.js';
import '../styles/feed.scss';

const Feed = () => {
  const navigate = useNavigate();
  const { loading, feed, fetchFeed, error } = useFeed();
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchFeed();
  }, []);

  const handlePostCreated = () => {
    setShowCreatePost(false);
    fetchFeed();
  };

  if (loading) {
    return <div className="loading">Loading feed...</div>
  };

  if (error === "Authentication token is missing.") {
    console.log(error);
    return (
      <div className="feed">
        <header className="feed-header">
          <div className="header-content">
            <h3 className="logo">Clipzy</h3>
            <p className="header-subtitle">Please sign in to view your feed.</p>
            <button className="create-post-btn" onClick={() => navigate('/signin')}>
              Sign In to View Feed
            </button>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className="feed">
      <header className="feed-header">
        <div className="header-content">
          <h3 className="logo">Clipzy</h3>
          <p className="header-subtitle">Stream of proof posts from people you follow</p>
          <button
            className="create-post-btn"
            onClick={() => setShowCreatePost(true)}
            aria-label="Create new post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
            Create Post
          </button>
        </div>
      </header>

      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} onPostCreated={handlePostCreated} />
      )}

      <main className="feed-main">
        <div className="feed-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : feed.length === 0 ? (
            <div className="no-posts">No posts to show. Follow some creators to see their posts here!</div>
          ) : (
            feed.sort((a, b) => b.createdAt - a.createdAt).map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
      </main>
    </div>
  )
}

export default Feed
