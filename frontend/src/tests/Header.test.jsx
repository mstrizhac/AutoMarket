import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';

describe('Header Component', () => {

    test('renders the logo correctly', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByText('AutoMarket')).toBeInTheDocument();
        expect(screen.getByText('🚗')).toBeInTheDocument();
    });

    test('renders navigation links with correct paths', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const addListingLink = screen.getByText('Додати оголошення');
        expect(addListingLink).toHaveAttribute('href', '/add-listing');

        const aboutLink = screen.getByText('Про нас');
        expect(aboutLink).toHaveAttribute('href', '/about');

        const contactLink = screen.getByText('Контакти');
        expect(contactLink).toHaveAttribute('href', '/contact');
    });

    test('renders the user profile button', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const profileLinks = screen.getAllByRole('link');
        const profileButton = profileLinks.find(link => link.getAttribute('href') === '/profile');

        expect(profileButton).toBeInTheDocument();
    });

});