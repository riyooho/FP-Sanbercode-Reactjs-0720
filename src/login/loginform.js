import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import LoginContext from './logincontext.js'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [helperText, setHelperText] = useState('')
  const [error, setError] = useState(false)
  const {status, setStatus} = useContext(LoginContext)
  const history = useHistory()

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [username, password])

  const handleLogin = () => {
    if (username === 'admin@sanbercode.com' && password === '123456') {
      setError(false)
      setStatus(true)
      setHelperText('Login Successfully')
      handleSuccess()

    } else {
      setError(true)
      setStatus(false)
      setHelperText('Incorrect username or password')
    }
  }

  const handleSuccess = () => {
    history.push("/movies")
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin()
    }
  }

  return (
    <>
    <h1>Login</h1>
      <form autoComplete="off" onSubmit={handleLogin}>
            <div>
              <input
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="admin@sanbercode.com"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <input
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="123456"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>

            <button
              variant="contained"
              size="large"
              color="secondary"
              // onClick={()=>handleLogin()}
              disabled={isButtonDisabled}>
              Login
            </button>

        <>{helperText}</>
      </form>
    </>
  )
}

export default Login;