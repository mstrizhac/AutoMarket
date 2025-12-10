import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Импортируем саму функцию для мока
import '@testing-library/jest-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

jest.mock('../env.js', () => ({
    __esModule: true,
    default: {
        VITE_API_URL: 'http://test-api.com/',
    },
}));

global.fetch = jest.fn();

describe('ProtectedRoute Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    const renderWithRouter = (ui) => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={ui} />
                    <Route path="/login" element={<h1>Login Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('redirects to login if no token is found in localStorage', async () => {
        renderWithRouter(<ProtectedRoute element={<h1>Secret Content</h1>} />);

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeInTheDocument();
        });
    });

    test('redirects to login if JWT is invalid (decode fails)', async () => {
        localStorage.setItem('accessToken', 'invalid_token_string');

        jwtDecode.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        renderWithRouter(<ProtectedRoute element={<h1>Secret Content</h1>} />);

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeInTheDocument();
        });
    });

    test('redirects to login if JWT is expired', async () => {
        localStorage.setItem('accessToken', 'expired_token');

        jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) - 100 });

        renderWithRouter(<ProtectedRoute element={<h1>Secret Content</h1>} />);

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeInTheDocument();
        });
    });

    test('redirects to login if server verification fails (fetch returns ok: false)', async () => {
        localStorage.setItem('accessToken', 'valid_local_token');

        jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 1000 });

        fetch.mockResolvedValueOnce({ ok: false });

        renderWithRouter(<ProtectedRoute element={<h1>Secret Content</h1>} />);

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeInTheDocument();
        });

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('renders the protected element if token is valid and server accepts it', async () => {
        localStorage.setItem('accessToken', 'good_token');

        jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 1000 });

        fetch.mockResolvedValueOnce({ ok: true });

        renderWithRouter(<ProtectedRoute element={<h1>Secret Content</h1>} />);

        await waitFor(() => {
            expect(screen.getByText('Secret Content')).toBeInTheDocument();
        });
    });

});