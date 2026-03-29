import { createContext, useCallback, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetProfile = useCallback(() => {
    setProfileUser(null);
    setUserPosts([]);
    setFollowers([]);
    setFollowing([]);
    setIsFollowing(false);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
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
        resetProfile,
        clearError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
