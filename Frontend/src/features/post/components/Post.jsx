import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { formatCaptionWithHashtags } from '../services/extractHashtags.service.jsx';
import { getRelativeTime } from '../services/formatTime.service.js';
import { dislikePost, likePost } from '../services/post.api.js';
import { checkFollowStatus, followUser, unfollowUser } from '../services/user.api.js';

const Post = ({ post }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Check if this is the user's own post (convert both to string for proper comparison)
  const isOwnPost = user && String(user.username) === String(post.userId.username);

  // Check initial follow status when component mounts
  useEffect(() => {
    if (user && !isOwnPost) {
      const checkStatus = async () => {
        try {
          const data = await checkFollowStatus(post.userId._id);
          setIsFollowing(data.isFollowing);
        } catch (error) {
          console.error('Error checking follow status:', error);
          setIsFollowing(false);
        }
      };
      checkStatus();
    }
  }, [user, post.userId._id, isOwnPost]);

  const handleFollowClick = async () => {
    // Check if user is authenticated
    if (!user) {
      const isWantToSignIn = window.confirm('You need to login or signup to follow users.\n\nClick OK to go to Sign In or Cancel to continue browsing.');
      if (isWantToSignIn) {
        navigate('/signin');
      }
      return;
    }

    try {
      setIsLoading(true);
      if (isFollowing) {
        // Unfollow user
        await unfollowUser(post.userId._id);
        setIsFollowing(false);
      } else {
        // Follow user
        await followUser(post.userId._id);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert(error.response?.data?.message || 'Failed to toggle follow status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeClick = async () => {
    // Check if user is authenticated
    if (!user) {
      const isWantToSignIn = window.confirm('You need to login or signup to like posts.\n\nClick OK to go to Sign In or Cancel to continue browsing.');
      if (isWantToSignIn) {
        navigate('/signin');
      }
      return;
    }

    try {
      setLikeLoading(true);
      if (isLiked) {
        // Unlike the post
        await dislikePost(post._id);
        setIsLiked(false);
      } else {
        // Like the post
        await likePost(post._id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert(error.response?.data?.message || 'Failed to toggle like status');
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <img src={post.userId.profilePicture}
            alt="User Avatar" className="avatar" />
          <div className="user-details">
            <div className="post-details">
              <h4 className="username">{post.userId.username}</h4>
              <span className="timestamp">{getRelativeTime(post.createdAt, post.updatedAt)}</span>
            </div>
            <p className="project-title">{post.projectId.title}</p>
          </div>
        </div>
        {!isOwnPost && (
          <button
            className="follow-btn"
            onClick={handleFollowClick}
            disabled={isLoading}
            aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
          >
            {isLoading ? (isFollowing ? 'Unfollowing...' : 'Following...') : isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
      <div className="post-content">
        <img src={post.imageUrl}
          alt="Post Image" className="post-image" />
        <p className="caption">{formatCaptionWithHashtags(post.caption)}</p>
      </div>
      <div className="post-actions">
        <button
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
          disabled={likeLoading}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          {isLiked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff0000">
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
            </svg>
          )}
        </button>
        <button className="action-btn comment-btn" aria-label="Comment on post" disabled title="Coming Soon!">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path>
          </svg>
          <span className="count">Coming Soon 🚀</span>
        </button>
        <button className="action-btn share-btn" aria-label="Share post" disabled title="Coming Soon!">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg>
          <span className="count">Coming Soon 🚀</span>
        </button>
      </div>
    </div>
  );
}

export default Post
