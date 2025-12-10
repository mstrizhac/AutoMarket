import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Images from '../components/Images/Images.jsx';

describe('Images Component', () => {

    const mockImages = [
        { url: 'https://example.com/car1.jpg' },
        { url: 'https://example.com/car2.jpg' }
    ];

    test('renders the list of images', () => {
        render(
            <Images
                images={mockImages}
                removeImage={() => {}}
                handleImageUpload={() => {}}
            />
        );

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'https://example.com/car1.jpg');
    });

    test('calls removeImage function when the delete button is clicked', () => {
        const mockRemove = jest.fn();

        render(
            <Images
                images={mockImages}
                removeImage={mockRemove}
                handleImageUpload={() => {}}
            />
        );

        const deleteButtons = screen.getAllByText('✕');
        fireEvent.click(deleteButtons[0]);

        expect(mockRemove).toHaveBeenCalledWith(0);
    });

    test('shows the upload button when there are less than 6 images', () => {
        render(
            <Images
                images={mockImages}
                removeImage={() => {}}
                handleImageUpload={() => {}}
            />
        );

        expect(screen.getByText('Додати фото')).toBeInTheDocument();
    });

    test('hides the upload button when there are 6 or more images', () => {
        const fullImages = new Array(6).fill({ url: 'test.jpg' });

        render(
            <Images
                images={fullImages}
                removeImage={() => {}}
                handleImageUpload={() => {}}
            />
        );

        expect(screen.queryByText('Додати фото')).not.toBeInTheDocument();
    });

    test('calls handleImageUpload when a file is selected', () => {
        const mockUpload = jest.fn();

        render(
            <Images
                images={[]}
                removeImage={() => {}}
                handleImageUpload={mockUpload}
            />
        );

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

        const input = screen.getByLabelText(/Додати фото/i);
        fireEvent.change(input, { target: { files: [file] } });
        expect(mockUpload).toHaveBeenCalled();
    });

});