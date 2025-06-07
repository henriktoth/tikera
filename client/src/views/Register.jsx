import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../store/moviesApi';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [register, {data: user, isSuccess, isError, error}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirm
        });
    };

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setUser({name: name, email: email, password: password}));
            navigate('/');
        }
    }, [isSuccess, user, navigate]);

    // Show error toast for 3 seconds when isError becomes true
    useEffect(() => {
        if (isError && error?.status === 422) {
            setShowErrorToast(true);
            const timer = setTimeout(() => setShowErrorToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isError, error]);

    return (
        <>
            {/* Toast for 422 error */}
            {showErrorToast && (
                <div className="toast toast-bottom toast-end z-50">
                  <div className="alert alert-error">
                    <span>Registration failed!</span>
                  </div>
                </div>
            )}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-purple-800">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-purple-900">Create Account</h1>
                        <p className="text-gray-600">Join Tikera today!</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                required
                            />
                        </div>
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
                        <div>
                            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Register
                        </button>
                    </form>
                     <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;