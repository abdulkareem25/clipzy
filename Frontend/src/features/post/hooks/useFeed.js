import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import { getFeed } from "../services/post.api";

export const useFeed = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, feed, setFeed } = context;

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const data = await getFeed();
      setFeed(data.posts);
    } catch (error) {
      console.error('Error fetching feed:', error);
      setFeed([]);
    }
    setLoading(false);
  };

  return {
    loading,
    feed,
    fetchFeed
  }
};