import { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost.jsx';
import Post from '../components/Post.jsx';
import { useFeed } from '../hooks/useFeed.js';
import '../styles/feed.scss';

const Feed = () => {
  const { loading, feed, fetchFeed } = useFeed();
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
          {feed.length === 0 ? (
            <div className="empty-feed">
              <h2>Your feed is empty</h2>
              <p>Follow some users to see their posts here.</p>
            </div>
          ) : (
            feed.map((post) => (
              <Post key={post._id} post={post} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default Feed
