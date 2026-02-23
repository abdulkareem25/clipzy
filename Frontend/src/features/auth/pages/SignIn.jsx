import React from 'react'
import '../styles/auth.scss'
import '../styles/form.scss'

const SignIn = () => {
    return (
        <div className='auth-wrapper'>
            <div className="auth-container">
                    <div className="form-content">
                        <h1>Clipzy</h1>
                        <form className="signin-form">
                            <div className='form-group'>
                                <label>Email Address</label>
                                <input type="email" className='form-control' placeholder='you@example.com' />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input type="password" className='form-control' placeholder='Enter your password' />
                            </div>
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                            </div>
                            <button type='submit' className='btn btn-primary btn-block'>Sign In</button>
                        </form>
                        <div className="form-footer">
                            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SignIn
