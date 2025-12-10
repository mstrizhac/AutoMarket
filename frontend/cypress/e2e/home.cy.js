describe('Home page', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/api/listing/cars*', [
            {
                id: 1,
                title: 'Super Car 1',
                name: 'Super Car 1',
                price: 25000,
                photos: ['https://via.placeholder.com/150'],
                condition: 'New',
                year: 2023,
                mileage: 0,
                fuel: 'Electric',
                city: 'Kyiv'
            },
            {
                id: 2,
                title: 'Super Car 2',
                name: 'Super Car 2',
                price: 15000,
                photos: ['https://via.placeholder.com/150'],
                condition: 'Used',
                year: 2020,
                mileage: 50000,
                fuel: 'Petrol',
                city: 'Lviv'
            }
        ]).as('getCars');

        cy.visit('/');
    });

    it('Shows title and cataloh', () => {
        cy.contains('Знайдіть ідеальний автомобіль').should('be.visible');
        cy.contains('Переглянути каталог').should('be.visible');
    });

    it('Shows listings', () => {
        cy.wait('@getCars');

        cy.get('img[alt*="Car"]').should('have.length.at.least', 1);

        cy.contains('€25000').should('be.visible');
    });
});