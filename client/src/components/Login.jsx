import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetMoviesQuery } from '../store/moviesApi.js';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data } = useGetMoviesQuery();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-800">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-900">Tikera</h1>
                    <p className="text-gray-600">Welcome to tIKera movie booking platform</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login; 