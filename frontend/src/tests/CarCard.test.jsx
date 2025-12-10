import { render, screen, fireEvent } from '@testing-library/react';
import CarCard from "../components/CarCard/CarCard.jsx";
import '@testing-library/jest-dom';

const mockCar = {
    id: 1,
    name: 'BMW X5',
    price: '50000',
    photos: ['img_url.jpg'],
    condition: 'New',
    year: 2023,
    mileage: 0,
    fuel: 'Diesel',
    city: 'Lviv',
    title: 'BMW photo'
};

describe('CarCard Component', () => {

    test('Properly show car data', () => {
        render(<CarCard car={mockCar} onClick={() => {}} />);

        expect(screen.getByText('BMW X5')).toBeInTheDocument();

        expect(screen.getByText(/€50000/i)).toBeInTheDocument();

        expect(screen.getByText('2023 рік')).toBeInTheDocument();
        expect(screen.getByText('Lviv')).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'img_url.jpg');
        expect(image).toHaveAttribute('alt', 'BMW photo');
    });

    test('Calls on click with valid data', () => {
        const handleClick = jest.fn();

        render(<CarCard car={mockCar} onClick={handleClick} />);

        fireEvent.click(screen.getByText('BMW X5'));

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(mockCar);
    });

    test('Shows valid status New', () => {
        render(<CarCard car={{ ...mockCar, condition: 'New' }} onClick={() => {}} />);
        expect(screen.getByText('New')).toBeInTheDocument();
    });
});