import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const ForgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'applicatoin/json'
            }
        }
        try {
            const { data } = await axios.post('/api/auth/forgotpassword',
                { email }, config);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.erorr);
            setEmail('');
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    };

    return (
        <div>
            <form onSubmit={ForgotPasswordHandler}>
                {error && <span>{error}</span>}
                {success && <span>{success}</span>}

                <h1>Forgot Password</h1>
                <label htmlFor='email'>Enter Email</label>
                <input required type='email' id='email' value='email' onChange={(e) => setEmail(e.target.value)} />

                <button type='submit'>Enter</button>
            </form>
        </div>
    )
}

export default ForgotPassword
