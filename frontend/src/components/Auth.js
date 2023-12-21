import { useState } from 'react'
import axios from 'axios'

const Auth = () => {
    const [isLogIn, setIsLogIn] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    const viewLogin = (status) => {
        setError(null)
        setIsLogIn(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        setError(null)
        if (!isLogIn && password !== confirmPassword) {
            setError('Passwords do not match')
            return
        } 
       
        const response = await axios.post('http://localhost:3000/api/v1/users')
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    {!isLogIn && <input type="password" placeholder="confirm password" />}
                    <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
                    {error && <p>{error}</p>}
                </form>
                <div className='auth-options'>
                    <button 
                        onClick={() => viewLogin(false)}
                        style={{backgroundColor: !isLogIn ? 'white' : 'lightgray'}}
                        >Sign Up</button>
                    <button 
                        onClick={() => viewLogin(true)}
                        style={{backgroundColor: isLogIn ? 'white' : 'lightgray'}}
                        >Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Auth