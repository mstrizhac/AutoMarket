import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../components/Select/Select.jsx';

describe('Select Component', () => {

    test('renders the label correctly', () => {
        render(
            <Select label="Choose Car" value="" onChange={() => {}}>
                <option value="volvo">Volvo</option>
            </Select>
        );

        expect(screen.getByText('Choose Car')).toBeInTheDocument();
    });

    test('renders children options and sets initial value', () => {
        render(
            <Select label="Test" value="option2" onChange={() => {}}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </Select>
        );

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(2);

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveValue('option2');
    });

    test('calls onChange when a new option is selected', () => {
        const handleChange = jest.fn();

        render(
            <Select label="Test" value="a" onChange={handleChange}>
                <option value="a">A</option>
                <option value="b">B</option>
            </Select>
        );

        const selectElement = screen.getByRole('combobox');

        fireEvent.change(selectElement, { target: { value: 'b' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('has the required attribute', () => {
        render(
            <Select label="Required Select" value="" onChange={() => {}}>
                <option value="">None</option>
            </Select>
        );

        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeRequired();
    });

});