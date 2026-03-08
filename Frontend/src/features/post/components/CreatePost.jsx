import { useState } from 'react';
import { createPost } from '../services/post.api';
import '../styles/createPost.scss';

const CreatePost = ({ onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!caption.trim()) {
      setError('Caption cannot be empty');
      return;
    }
    if (!imageFile) {
      setError('Please select an image');
      return;
    }
    if (!projectId) {
      setError('Please select a project');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('imageUrl', imageFile);
      formData.append('projectId', projectId);
      await createPost(formData);
      onPostCreated();
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Post</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="image-input">Select Image</label>
            <div className="image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <p>Click to upload image</p>
                </div>
              )}
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="caption-input">Caption</label>
            <textarea
              id="caption-input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write caption..."
              className="caption-input"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-input">Project ID</label>
            <input
              id="project-input"
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID"
              className="project-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
