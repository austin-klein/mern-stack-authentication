import { useState, useEffect } from 'react';
import { axios } from 'axios';
import { Link } from 'react-router-dom';


const Register = ({ history }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setError('');
            }, 4000);
            return setError('Passowords do not match');
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { username, email, password }, config);
            console.log(data);
            localStorage.setItem('authToken', data.token);

            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                {error && <span>{error}</span>}
                <label htmlFor="name">Username:</label>
                <input required type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input required type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input required type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type='submit'>Submit</button>
                <span><Link to='/login'>Login</Link></span>
            </form>
        </div>
    )

}

export default Register;