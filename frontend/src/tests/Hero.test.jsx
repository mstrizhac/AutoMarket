import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero/Hero.jsx';

describe('Hero Component', () => {

    test('renders the main title and description', () => {
        render(
            <MemoryRouter>
                <Hero scrollToCatalog={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Знайдіть ідеальний автомобіль/i)).toBeInTheDocument();
        expect(screen.getByText(/Найбільший вибір вживаних/i)).toBeInTheDocument();
    });

    test('renders the hero image', () => {
        render(
            <MemoryRouter>
                <Hero scrollToCatalog={() => {}} />
            </MemoryRouter>
        );

        const image = screen.getByAltText('Автомобілі');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
    });

    test('calls scrollToCatalog function when the button is clicked', () => {
        const mockScroll = jest.fn();

        render(
            <MemoryRouter>
                <Hero scrollToCatalog={mockScroll} />
            </MemoryRouter>
        );

        const button = screen.getByText('Переглянути каталог');
        fireEvent.click(button);

        expect(mockScroll).toHaveBeenCalledTimes(1);
    });

    test('renders the link to sell a car with correct path', () => {
        render(
            <MemoryRouter>
                <Hero scrollToCatalog={() => {}} />
            </MemoryRouter>
        );

        const link = screen.getByText('Продати авто');
        expect(link).toHaveAttribute('href', '/add-listing');
    });

});