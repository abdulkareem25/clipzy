import { useEffect, useState } from 'react';
import { createPost } from '../services/post.api';
import { createProject, getProjects } from '../services/project.api';
import '../styles/createPost.scss';

const CreatePost = ({ onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [createProjectError, setCreateProjectError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.projects || []);
        if (data.projects && data.projects.length > 0) {
          setProjectId(data.projects[0]._id);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreateProjectError(null);

    if (!newProjectTitle.trim()) {
      setCreateProjectError('Project title is required');
      return;
    }

    try {
      setCreateProjectLoading(true);
      const data = await createProject(newProjectTitle, newProjectDescription);
      const newProject = data.project;
      setProjects([...projects, newProject]);
      setProjectId(newProject._id);
      setNewProjectTitle('');
      setNewProjectDescription('');
      setShowCreateProject(false);
    } catch (err) {
      console.error('Error creating project:', err);
      setCreateProjectError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setCreateProjectLoading(false);
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
      formData.append('image', imageFile);
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
    <>
      <div className="create-post-overlay" onClick={onClose}>
        <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Create Post</h2>
            <button className="close-btn" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></button>
          </div>

          <form onSubmit={handleSubmit} className="create-post-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="project-select">Project</label>
              {projectsLoading ? (
                <div className="loading-text">Loading projects...</div>
              ) : projects.length > 0 ? (
                <div className="project-selector">
                  <select
                    id="project-select"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="project-select"
                  >
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowCreateProject(true)}
                  >
                    + New Project
                  </button>
                </div>
              ) : (
                <div className="no-projects">
                  <p>No projects yet. Create one to continue.</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowCreateProject(true)}
                  >
                    Create Project
                  </button>
                </div>
              )}
            </div>

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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
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

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading || !projectId}>
                {loading ? 'Creating...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showCreateProject && (
        <div className="create-post-overlay" onClick={() => setShowCreateProject(false)}>
          <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Project</h2>
              <button className="close-btn" onClick={() => setShowCreateProject(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></button>
            </div>

            <form onSubmit={handleCreateProject} className="create-post-form">
              {createProjectError && <div className="error-message">{createProjectError}</div>}

              <div className="form-group">
                <label htmlFor="project-title-input">Project Title</label>
                <input
                  id="project-title-input"
                  type="text"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                  className="project-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="project-desc-input">Description (Optional)</label>
                <textarea
                  id="project-desc-input"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Enter project description"
                  className="caption-input"
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateProject(false)}
                  disabled={createProjectLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={createProjectLoading}
                >
                  {createProjectLoading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;