import React, { useState, useEffect } from 'react'   
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'      
import { signIn } from '../../redux/reducers/authSlice'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const { loading, error, user } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false })
  
    useEffect(() => {
      if (user) {
        navigate('/user')   
      }
    }, [user, navigate])
  
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(signIn(credentials))
    }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={credentials.rememberMe}
              onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" disabled={loading === 'pending'}>
            {loading === 'pending' ? 'Connexion...' : 'Sign In'}
          </button>
          {error && (
            <div style={{ color: 'red', marginTop: '1rem' }}>
              Erreur : {error.message || error.toString()}
            </div>
          )}
        </form>
      </section>
    </main>
  )
}

export default LoginForm

  