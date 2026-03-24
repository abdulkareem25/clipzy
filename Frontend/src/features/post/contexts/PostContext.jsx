import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('discover'); // 'discover' or 'following'

  return (
    <PostContext.Provider value={{
      loading,
      setLoading,
      feed,
      setFeed,
      creating,
      setCreating,
      error,
      setError,
      feedType,
      setFeedType
    }}>
      {children}
    </PostContext.Provider>
  )
};