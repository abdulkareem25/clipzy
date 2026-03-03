import { Link, useNavigate } from 'react-router'
import '../styles/main.scss'
import '../styles/form.scss'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, handleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleSignIn(email, password);

    navigate('/');

  };

  if(loading) return (
    <main>
      <div className="form-container">
        <h2>Loading...</h2>
      </div>
    </main>
  );

  return (
    <main>
      <div className="form-container">
        <h2>Clipzy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
                {showPassword ? 'Hide' : 'Show'}
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