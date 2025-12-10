describe('Add Listing Page', () => {

    beforeEach(() => {
        const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk5OTk5OTk5OTksImlkIjoxfQ.signature';

        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', dummyToken);
        });

        cy.intercept('POST', '**/api/users/verify', {
            statusCode: 200,
            body: true
        }).as('verifyToken');

        cy.intercept('POST', '**/api/listing/add-car', {
            statusCode: 201,
            body: { id: 101, message: 'Car created successfully' }
        }).as('createCarRequest');

        cy.visit('/add-listing');
    });

    it('redirects unauthenticated users to login page', () => {
        cy.clearLocalStorage();
        cy.visit('/add-listing');

        cy.url().should('include', '/login');
    });

    it('renders the form elements correctly', () => {
        cy.get('input[name="title"]').should('be.visible');
        cy.get('input[name="price"]').should('be.visible');
        cy.contains('button', 'Опублікувати').should('be.visible');
    });

    it('allows user to fill the form, upload image, and submit', () => {
        const alertStub = cy.stub().as('alertStub');
        cy.on('window:alert', alertStub);

        cy.get('input[name="title"]').type('Tesla Model S Plaid');
        cy.get('input[name="price"]').type('45000');
        cy.get('input[name="mileage"]').type('15000');


        cy.get('select[name="year"]').select("2022");
        cy.get('select[name="city"]').select("Lviv");
        cy.get('select[name="fuelType"]').select('Electric');

        cy.get('input[type="file"]').selectFile({
            contents: Cypress.Buffer.from('fake-image'),
            fileName: 'car.jpg',
            mimeType: 'image/jpeg',
        }, { force: true });

        cy.contains('button', 'Опублікувати').click();

        cy.wait('@createCarRequest').then((interception) => {
            expect(interception.request.body).to.exist;
            expect(interception.response.statusCode).to.equal(201);
        });
    });

    it('shows validation error if required fields are empty', () => {
        cy.contains('button', 'Опублікувати').click();
        cy.get('input[name="title"]:invalid').should('exist');
    });

});