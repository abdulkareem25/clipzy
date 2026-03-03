import { Link } from 'react-router'
import '../styles/main.scss'
import '../styles/form.scss'

const SignIn = () => {

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <main>
      <div className="form-container">
        <h2>Clipzy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input type="password" id="password" name="password" required />
              <button type="button" className="toggle-password">Show</button>
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