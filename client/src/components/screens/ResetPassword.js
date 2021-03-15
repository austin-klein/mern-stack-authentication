import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = (match) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const ResetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'applicatoin/json'
            }
        };

        if (password !== confirmPassword) {
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                setError('');
            }, 4000);
            return setError('Passwords dont match')
        }

        try {
            const { data } = await axios.put(`/api/auth/resetpassword/${match.params.resetToken}`,
                { password }, config);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.erorr);

            setTimeout(() => {
                setError('');
            }, 4000);
        }
    };

    return (
        <div>
            <form onSubmit={ResetPasswordHandler}>
                {error && <span>{error}</span>}
                {success && (<span>{success} <Link to='/login'>Login</Link></span>)}

                <h1>Forgot Password</h1>
                <label htmlFor='password'>New Password:</label>
                <input required type='password' id='password' autoComplete='true' value={password} onChange={(e) => setPassword(e.target.value)} />

                <h1>Confirm New Password</h1>
                <label htmlFor='confirmpassword'>New Password:</label>
                <input required type='password' id='confirmpassword' autoComplete='true' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword;
