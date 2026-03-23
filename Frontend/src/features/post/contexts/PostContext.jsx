import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  return (
    <PostContext.Provider value={{
      loading,
      setLoading,
      feed,
      setFeed,
      creating,
      setCreating,
      error,
      setError
    }}>
      {children}
    </PostContext.Provider>
  )
};