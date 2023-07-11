//Test1
describe('Issue deletion', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        });
    });

    it('Should delete an issue and validate it successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {

            cy.get('[data-testid="icon:trash"]').click();
        });

        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
    })


});


//Test2
describe('Issue deletion process with cancelling the action', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('Click on an issue to see').click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        });
    });

    it('Should start deleting an issue but then cancel the action', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {

            cy.get('[data-testid="icon:trash"]').click();
        });

        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.contains('Click on an issue to see').should('exist');
    })
});
