import { useState } from 'react';
import axios from 'axios';

import Header from '../header';

import './login.css';

const headerInfo = { title: 'Login', img: '/logo512.png', showHamburger: false };

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (email && password) {
            const data = {
                email: email,
                password: password
            }

            axios.post('http://localhost:5000/api/v1/auth/login', data)
                .then(res => {
                    console.log(res.data);
                    setEmail('');
                    setPassword('');
                    setIsLoading(false);
                    setIsError(false);
                })
                .catch(error => {
                    console.log(error);
                    setErrorMessage('');
                    setIsError(true);
                });
        }
    }

    return (
        <>
            <Header {...headerInfo} />
            <article>
                <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        isError && <div className="error-container"><p>{errorMessage}</p></div>
                    }
                    <div className="submit-container">
                        <button type="submit" className="btn" disabled={isLoading}>Login</button>
                    </div>
                </form>
            </article>
        </>
    );
}

export default Login;