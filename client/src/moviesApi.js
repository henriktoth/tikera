const API_URL = import.meta.env.VITE_API_URL;

export const moviesApi = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    },

    // Add more API endpoints here as needed
    getMovies: async () => {
        try {
            const response = await fetch(`${API_URL}/movies`);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            return await response.json();
        } catch (err) {
            console.error('Error fetching movies:', err);
            throw err;
        }
    }
}; 