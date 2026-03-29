import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import {
  checkFollowStatus,
  fetchFollowers,
  fetchFollowing,
  fetchUserPosts,
  fetchUserProfile,
  followUser,
  unfollowUser,
} from '../services/profile.api';
import '../styles/profile.scss';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth();
  const {
    profileUser,
    setProfileUser,
    userPosts,
    setUserPosts,
    followers,
    setFollowers,
    following,
    setFollowing,
    isFollowing,
    setIsFollowing,
    loading,
    setLoading,
    error,
    setError,
  } = useProfile();

  const [showFollowersList, setShowFollowersList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = currentUser && profileUser && currentUser._id === profileUser._id;

  // Fetch profile data
  useEffect(() => {
    if (!userId || !currentUser) return;

    const loadProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userProfileData = await fetchUserProfile(userId);
        setProfileUser(userProfileData.user || userProfileData);

        const posts = await fetchUserPosts(userId);
        setUserPosts(posts);

        const followersData = await fetchFollowers(userId);
        setFollowers(followersData);

        const followingData = await fetchFollowing(userId);
        setFollowing(followingData);

        // Check follow status if not own profile
        if (userProfileData.user?._id !== currentUser._id || userProfileData._id !== currentUser._id) {
          try {
            const statusData = await checkFollowStatus(userId);
            setIsFollowing(statusData.isFollowing);
          } catch {
            setIsFollowing(false);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile');
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [userId, currentUser]);

  const handleFollowClick = async () => {
    if (!currentUser) {
      const shouldSignIn = window.confirm(
        'You need to log in to follow users. Go to Sign In?'
      );
      if (shouldSignIn) {
        navigate('/signin');
      }
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(profileUser._id);
        setIsFollowing(false);
      } else {
        await followUser(profileUser._id);
        setIsFollowing(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to update follow status');
      console.error('Follow error:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <span className="loading-spinner"></span>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button className="btn-primary" onClick={() => navigate('/feed')}>
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <p>User not found</p>
          <button className="btn-primary" onClick={() => navigate('/feed')}>
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="profile-title">Profile</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="profile-content">
        {/* Hero Section with Profile Picture and Bio */}
        <div className="profile-hero">
          <div className="profile-picture-wrapper">
            <img
              src={profileUser.profilePicture}
              alt={profileUser.fullName}
              className="profile-picture"
              onError={(e) => {
                e.target.src =
                  'https://ik.imagekit.io/abdulkareem25/default_pfp.jpg';
              }}
            />
          </div>

          <div className="profile-info">
            <div className="profile-header-content">
              <div>
                <h1 className="profile-name">{profileUser.fullName}</h1>
                <p className="profile-username">@{profileUser.username}</p>
              </div>
              {!isOwnProfile && (
                <button
                  className={`btn-follow ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowClick}
                  disabled={followLoading}
                >
                  {followLoading ? (
                    <span className="btn-loading">...</span>
                  ) : isFollowing ? (
                    'Following'
                  ) : (
                    'Follow'
                  )}
                </button>
              )}
              {isOwnProfile && (
                <button className="btn-edit" onClick={() => {/* TODO: Edit profile modal */ }}>
                  ✎ Edit Profile
                </button>
              )}
            </div>

            {profileUser.bio && (
              <p className="profile-bio">{profileUser.bio}</p>
            )}

            {/* Stats Section */}
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{userPosts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <button
                className="stat-item stat-button"
                onClick={() => setShowFollowersList(!showFollowersList)}
              >
                <span className="stat-value">{followers.length}</span>
                <span className="stat-label">Followers</span>
              </button>
              <button
                className="stat-item stat-button"
                onClick={() => setShowFollowingList(!showFollowingList)}
              >
                <span className="stat-value">{following.length}</span>
                <span className="stat-label">Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Followers/Following Lists */}
        {showFollowersList && followers.length > 0 && (
          <div className="followers-section">
            <div className="section-header">
              <h3>Followers ({followers.length})</h3>
              <button
                className="btn-close"
                onClick={() => setShowFollowersList(false)}
              >
                ✕
              </button>
            </div>
            <div className="followers-grid">
              {followers.map((follower) => (
                <div key={follower._id} className="follower-card">
                  <img
                    src={follower.profilePicture}
                    alt={follower.fullName}
                    className="follower-pic"
                    onError={(e) => {
                      e.target.src =
                        'https://ik.imagekit.io/abdulkareem25/default_pfp.jpg';
                    }}
                  />
                  <div className="follower-info">
                    <p className="follower-name">{follower.fullName}</p>
                    <p className="follower-username">@{follower.username}</p>
                  </div>
                  <button
                    className="btn-visit"
                    onClick={() => navigate(`/profile/${follower._id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showFollowingList && following.length > 0 && (
          <div className="following-section">
            <div className="section-header">
              <h3>Following ({following.length})</h3>
              <button
                className="btn-close"
                onClick={() => setShowFollowingList(false)}
              >
                ✕
              </button>
            </div>
            <div className="following-grid">
              {following.map((user) => (
                <div key={user._id} className="following-card">
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="following-pic"
                    onError={(e) => {
                      e.target.src =
                        'https://ik.imagekit.io/abdulkareem25/default_pfp.jpg';
                    }}
                  />
                  <div className="following-info">
                    <p className="following-name">{user.fullName}</p>
                    <p className="following-username">@{user.username}</p>
                  </div>
                  <button
                    className="btn-visit"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="profile-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <span className="tab-icon">📸</span>
              Posts ({userPosts.length})
            </button>
          </div>

          {/* Posts Grid */}
          <div className="posts-grid">
            {userPosts.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📭</p>
                <p className="empty-message">
                  {isOwnProfile
                    ? 'No posts yet. Share your first project!'
                    : "This user hasn't posted yet."}
                </p>
              </div>
            ) : (
              userPosts.map((post) => (
                <div key={post._id} className="post-grid-item">
                  <div
                    className="post-image-wrapper"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="post-grid-image"
                    />
                    <div className="post-overlay">
                      <span className="post-project">{post.projectId?.title}</span>
                    </div>
                  </div>
                  <p className="post-caption">{post.caption.substring(0, 50)}...</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
