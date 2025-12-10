import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRoutes from '../components/Router/AppRoutes.jsx';

jest.mock('../pages/Home/Home.jsx', () => () => <div>Home Page</div>);
jest.mock('../pages/About/About.jsx', () => () => <div>About Page</div>);
jest.mock('../pages/AddListing/AddListing.jsx', () => () => <div>Add Listing Page</div>);
jest.mock('../pages/Contact/Contact.jsx', () => () => <div>Contact Page</div>);
jest.mock('../pages/Profile/Profile.jsx', () => () => <div>Profile Page</div>);
jest.mock('../pages/Login/Auth.jsx', () => ({ type }) => <div>Auth Page: {type}</div>);

jest.mock('../components/ProtectedRoute/ProtectedRoute.jsx', () => ({ element }) => (
    <div data-testid="protected-wrapper">{element}</div>
));

jest.mock('../components/Router/MainLayout.jsx', () => {
    const { Outlet } = require('react-router-dom');
    return () => (
        <div data-testid="main-layout">
            <h1>Layout Header</h1>
            <Outlet />
        </div>
    );
});

describe('AppRoutes Integration', () => {

    const navigateTo = (path) => {
        window.history.pushState({}, 'Test page', path);
    };

    test('renders Home page on default route "/"', async () => {
        navigateTo('/');
        render(<AppRoutes />);

        expect(await screen.findByText('Home Page')).toBeInTheDocument();
        expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    });

    test('renders About page on "/about"', async () => {
        navigateTo('/about');
        render(<AppRoutes />);

        expect(await screen.findByText('About Page')).toBeInTheDocument();
    });

    test('renders Contact page on "/contact"', async () => {
        navigateTo('/contact');
        render(<AppRoutes />);

        expect(await screen.findByText('Contact Page')).toBeInTheDocument();
    });

    test('renders AddListing page wrapped in ProtectedRoute', async () => {
        navigateTo('/add-listing');
        render(<AppRoutes />);

        expect(await screen.findByText('Add Listing Page')).toBeInTheDocument();

        // Проверяем, что она внутри защитной обертки (которую мы замокали)
        expect(screen.getByTestId('protected-wrapper')).toBeInTheDocument();
    });

    test('renders Login page correctly', async () => {
        navigateTo('/login');
        render(<AppRoutes />);

        expect(await screen.findByText('Auth Page: login')).toBeInTheDocument();
    });

    test('renders Register page correctly', async () => {
        navigateTo('/register');
        render(<AppRoutes />);

        expect(await screen.findByText('Auth Page: register')).toBeInTheDocument();
    });

});