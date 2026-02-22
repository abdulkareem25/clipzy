import React from 'react'

const SignIn = () => {
    return (
        <div className='auth-wrapper'>
            <div className="auth-container">
                <h1>Sign In</h1>
                <form>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" className='form-control' placeholder='Enter email' />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" className='form-control' placeholder='Enter password' />
                    </div>
                    <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
