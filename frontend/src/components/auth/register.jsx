import { useState } from 'react';
import axios from 'axios';

import Header from '../header';

import './register.css';

const headerInfo = { title: 'Register', img: '/logo512.png', showHamburger: false };

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [file, setFile] = useState('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_215059.png&f=1&nofb=1');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [setUserCredential] = useState(null);

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password && confirmPassword && file) {
            if (password === confirmPassword) {
                setIsLoading(true);
                setIsError(false);

                const data = {
                    name: name,
                    email: email,
                    password: password,
                    image: file
                }

                axios.post('http://localhost:5000/api/v1/auth/register', data)
                    .then(res => {
                        setUserCredential(res.data);
                        setName('');
                        setEmail('');
                        setPassword('');
                        setFile('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_215059.png&f=1&nofb=1');
                        setIsLoading(false);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setIsError(true);
                    });

            } else {
                setIsError(true);
                setErrorMessage('Password do not match...');
            }
        } else {
            setIsError(true);
            setErrorMessage('Please enter all inputs...');
        }
    }

    return (
        <>
            <Header {...headerInfo} />
            <article>
                <form action="" className="form-container" onSubmit={handleSubmit}>
                    <div className="image-container">
                        <img src={file} alt="" />
                    </div>
                    <div className="image-container">
                        <label htmlFor="image" className="upload">Choose Your Profile Image</label>
                        <input type="file" id="image" name="image" accept='image/*' onChange={handleImage} />
                    </div>
                    {
                        isError && <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    }
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="submit-container">
                        <button type="submit" className="btn" disabled={isLoading}>Register</button>
                    </div>
                </form>
            </article>
        </>
    );
}

export default Register;