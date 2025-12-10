import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input/Input.jsx';

describe('Input Component', () => {

    test('renders the label and placeholder text', () => {
        render(
            <Input
                label="Email Address"
                placeHolder="Enter your email"
                value=""
                onChange={() => {}}
            />
        );

        expect(screen.getByText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    test('calls the onChange function when user types', () => {
        const handleChange = jest.fn();

        render(
            <Input
                label="Name"
                value=""
                onChange={handleChange}
            />
        );

        const inputElement = screen.getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'Hello' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('renders with the correct input type', () => {
        render(
            <Input
                label="Password"
                type="password"
                placeHolder="Secret"
                onChange={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText('Secret');
        expect(inputElement).toHaveAttribute('type', 'password');
    });

    test('input has the required attribute', () => {
        render(
            <Input
                label="Test"
                onChange={() => {}}
            />
        );

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeRequired();
    });

});