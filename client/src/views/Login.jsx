import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useLoginMutation } from '../store/moviesApi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data: user, isSuccess, isError, isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setUser({name: user.name, email: email, password: password}));
            navigate('/');
        }
    }, [isSuccess, user, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-800">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-900">Tikera</h1>
                    <p className="text-gray-600">Welcome to Tikera movie booking platform</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                    {isError && (
                        <div className="text-red-600 text-sm mt-2 text-center">
                            Login failed. Please check your credentials.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;