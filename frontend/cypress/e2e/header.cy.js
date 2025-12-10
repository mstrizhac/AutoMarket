describe('Header', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Navigates to "about"', () => {
        cy.contains('nav a', 'Про нас').click();
        cy.url().should('include', '/about');
        cy.contains('Про нас').should('be.visible');
    });

    it('Navigates to "contacts"', () => {
        cy.contains('nav a', 'Контакти').click();
        cy.url().should('include', '/contact');
        cy.contains('Контакти').should('be.visible');
    });

    it('Add-listing navigates to "login" if not authorized', () => {
        cy.contains('nav a', 'Додати оголошення').click();
        cy.url().should('include', '/login');
        cy.get('button[type="submit"]').should('exist');
    });
});