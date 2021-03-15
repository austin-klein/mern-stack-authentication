import { useState, useEffect } from 'react';
import axios from 'axios';

const Private = ({ history }) => {
    const [error, setError] = useState('');
    const [privateData, setPrivateData] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login')
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }

            try {
                const { data } = await axios.get('/api/private', config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem('authToken');
                setError('You are not authorized')
            }
        }

        fetchPrivateData();
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        history.push('/login')
    }

    return (
        error ? <span>{error}</span> : <div>{privateData}<button onClick={logoutHandler}>Logout</button></div>

    )
};

export default Private;