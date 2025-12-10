describe('Authorization', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Success login', () => {
        cy.intercept('POST', '**/api/users/login', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-token-12345',
                user: {id: 1, email: 'test@test.com'}
            }
        }).as('loginRequest');

        cy.get('input[type="email"]').type('test@test.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        cy.url().should('not.include', '/login');

        cy.window().then((window) => {
            expect(window.localStorage.getItem('accessToken')).to.eq('fake-jwt-token-12345');
        });
    });

    it('Alert when unsuccess login', () => {
        cy.intercept('POST', '**/api/users/login', {
            statusCode: 401,
            body: { message: 'No such user' }
        }).as('loginFail');

        const alertStub = cy.stub().as('alertStub');
        cy.on('window:alert', alertStub);

        cy.get('input[type="email"]').type('wrong@test.com');
        cy.get('input[type="password"]').type('wrongpass');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginFail');

        cy.get('@alertStub').should('have.been.calledWith', 'No such user');
    });
});