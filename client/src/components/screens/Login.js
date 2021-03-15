import { useState, useEffect } from 'react';
import { axios } from 'axios';
import { Link } from 'react-router-dom';


const Login = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        };

        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, config);

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

                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: <Link to='/forgotpassword'>Forgot Password?</Link></label>
                <input required type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Submit</button>
                <span><Link to='/register'>Register</Link></span>
            </form>
        </div>
    )

}

export default Login;