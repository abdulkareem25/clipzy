import '../styles/auth.scss'
import '../styles/form.scss'

const SignUp = () => {
  return (
    <div className='auth-wrapper'>
        <div className="auth-container">
            <h1>Sign Up</h1>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className='form-control' placeholder='Enter name' />
            </div>
            <div className='form-group'>
                <label>Username</label>
                <input type="text" className='form-control' placeholder='Enter username' />
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input type="email" className='form-control' placeholder='Enter email' />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" className='form-control' placeholder='Enter password' />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea className='form-control' placeholder='Enter bio'></textarea>
            </div>
            <div className="form-group">
                <label>Profile Picture</label>
                <input type='image' className='form-control' />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default SignUp