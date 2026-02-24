import { useState } from 'react'
import '../styles/auth.scss'
import '../styles/form.scss'

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <div className='auth-wrapper'>
            <div className="auth-container">
                <div className="form-content">
                    <h1>Clipzy</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="signup-form">
                        <div className="form-grid">
                            <div className='form-group'>
                                <label>Full Name</label>
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    type="text"
                                    className='form-control'
                                    placeholder='John Doe'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Username</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    className='form-control'
                                    placeholder='@username'
                                />
                            </div>
                            <div className='form-group form-full'>
                                <label>Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className='form-control'
                                    placeholder='you@example.com'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className='form-control'
                                    placeholder='Min 8 characters'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Confirm Password</label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    className='form-control'
                                    placeholder='Confirm password'
                                />
                            </div>
                            <div className="form-group form-full">
                                <label>Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className='form-control'
                                    placeholder='Tell us about yourself'
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary btn-block'
                        >
                            Create Account
                        </button>
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