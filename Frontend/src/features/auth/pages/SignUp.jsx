import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import '../styles/form.scss';
import '../styles/main.scss';

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, handleSignUp } = useAuth();
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('bio', bio);
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile);
    }

    await handleSignUp(formData);
    navigate('/feed');
  };

  if (loading) return (
    <main className='main'>
      <div className="form-container">
        <h2 className="logo">Loading...</h2>
      </div>
    </main>
  );

  return (
    <main className='main'>
      <div className="form-container">
        <h2 className="logo">Clipzy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter a strong password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              rows="1"
              className="bio-input"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <div className="image-upload">
              {profilePicturePreview ? (
                <img src={profilePicturePreview} alt="Profile Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <p>Click to upload profile picture</p>
                </div>
              )}
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="file-input"
              />
            </div>
          </div>

          <button className="primary-btn" type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link className='link' to={'/signin'}>SignIn</Link></p>
      </div>
    </main>
  )
}

export default SignUp