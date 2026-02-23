import '../styles/auth.scss'
import '../styles/form.scss'

const SignUp = () => {
    return (
        <div className='auth-wrapper'>
            <div className="auth-container">
                    <div className="form-content">
                        <h1>Clipzy</h1>
                        <form className="signup-form">
                            <div className="form-grid">
                                <div className='form-group'>
                                    <label>Full Name</label>
                                    <input type="text" className='form-control' placeholder='John Doe' />
                                </div>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input type="text" className='form-control' placeholder='@username' />
                                </div>
                                <div className='form-group form-full'>
                                    <label>Email Address</label>
                                    <input type="email" className='form-control' placeholder='you@example.com' />
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type="password" className='form-control' placeholder='Min 8 characters' />
                                </div>
                                <div className='form-group'>
                                    <label>Confirm Password</label>
                                    <input type="password" className='form-control' placeholder='Confirm password' />
                                </div>
                                <div className="form-group form-full">
                                    <label>Bio</label>
                                    <textarea className='form-control' placeholder='Tell us about yourself' rows="3"></textarea>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-block'>Create Account</button>
                        </form>
                        <div className="form-footer">
                            <p>Already have an account? <a href="/signin">Sign In</a></p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SignUp