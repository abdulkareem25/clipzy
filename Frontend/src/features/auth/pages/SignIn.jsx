import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../styles/form.scss';
import '../styles/main.scss';

const SignIn = () => {

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, handleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleSignIn(credential, password);

    navigate('/feed');

  };

  if (loading) return (
    <main className='main'>
      <div className="form-container">
        <h2 className='logo'>Loading...</h2>
      </div>
    </main>
  );

  return (
    <main className='main'>
      <div className="form-container">
        <h2 className='logo'>Clipzy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="credential">Email or Username</label>
            <input
              value={credential}
              type="text"
              id="credential"
              name="credential"
              placeholder="Enter your email or username"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input
                value={password}
                type={showPassword ? "type" : "password"}
                id="password"
                name="password"
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
          <button className="primary-btn" type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <Link className='link' to={'/signup'}>SignUp</Link></p>
      </div>
    </main>
  )
}

export default SignIn