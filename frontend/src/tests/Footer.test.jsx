import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from "../components/Footer/Footer.jsx";


describe('Footer Component', () => {

    test('renders the footer section', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    test('displays company title and description', () => {
        render(<Footer />);
        expect(screen.getByText('AutoMarket')).toBeInTheDocument();
        expect(screen.getByText(/Найкращий сервіс для купівлі/i)).toBeInTheDocument();
    });

    test('shows contact information', () => {
        render(<Footer />);
        expect(screen.getByText('📞 +380 44 123 45 67')).toBeInTheDocument();
        expect(screen.getByText('📧 info@automarket.ua')).toBeInTheDocument();
    });

    test('shows working hours', () => {
        render(<Footer />);
        expect(screen.getByText(/Пн-Пт: 9:00 - 18:00/i)).toBeInTheDocument();
        expect(screen.getByText(/Сб-Нд: 10:00 - 16:00/i)).toBeInTheDocument();
    });

    test('displays the copyright notice', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2025 AutoMarket/i)).toBeInTheDocument();
    });

});