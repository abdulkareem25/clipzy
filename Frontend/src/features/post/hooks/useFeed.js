import { useContext } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { PostContext } from "../contexts/PostContext";
import { getFeed, getFollowingPosts } from "../services/post.api";

export const useFeed = () => {
  const context = useContext(PostContext);
  const { user } = useAuth();

  const { loading, setLoading, feed, setFeed, error, setError, feedType, setFeedType } = context;

  const fetchFeed = async (type = null) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      const currentType = type || feedType;

      // Not logged in: always show global feed
      if (!user) {
        data = await getFeed();
      } else {
        // Logged in user: show based on selected feed type
        if (currentType === 'following') {
          data = await getFollowingPosts();
        } else {
          data = await getFeed();
        }
      }

      setFeed(data.posts || []);
    } catch (error) {
      console.error('Error fetching feed:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      setFeed([]);
    }
    setLoading(false);
  };

  const switchFeedType = async (type) => {
    setFeedType(type);
    await fetchFeed(type);
  };

  return {
    loading,
    feed,
    fetchFeed,
    error,
    feedType,
    switchFeedType
  }
};