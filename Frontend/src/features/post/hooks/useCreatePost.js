import { useContext, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { createPost } from '../services/post.api';

export const useCreatePost = () => {
      const context = useContext(PostContext);
      const { setCreating } = context;
      const [error, setError] = useState(null);

      const handleCreatePost = async (postData) => {
            setCreating(true);
            setError(null);

            try {
                  const result = await createPost(postData);
                  return result;
            } catch (err) {
                  console.error('Error creating post:', err);
                  const errorMessage = err.response?.data?.message || err.message || 'Failed to create post';
                  setError(new Error(errorMessage));
                  throw err;
            } finally {
                  setCreating(false);
            }
      };

      return {
            handleCreatePost,
            error,
            setError
      };
};
