import { useEffect } from 'react';
import Post from '../components/Post.jsx';
import { useFeed } from '../hooks/useFeed.js';
import '../styles/feed.scss';

const Feed = () => {

  const { loading, feed, fetchFeed } = useFeed();

  useEffect(() => {
    fetchFeed();
  }, []);

  if(loading) {
    return <div className="loading">Loading feed...</div>
  };

  return (
    <div className="feed">
      <header className="feed-header">
        <div className="header-content">
          <h3 className="logo">Clipzy</h3>
          <p className="header-subtitle">Stream of proof posts from people you follow</p>
        </div>
      </header>
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
