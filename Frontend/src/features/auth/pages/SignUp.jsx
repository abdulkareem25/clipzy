import { Link } from "react-router"
import '../styles/main.scss'
import '../styles/form.scss'
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const { loading, handleSignUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleSignUp(username, email, password);

    navigate('/');

  };

  if (loading) return (
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
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
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
          <button className="primary-btn" type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link className='link' to={'/signin'}>SignIn</Link></p>
      </div>
    </main>
  )
}

export default SignUp