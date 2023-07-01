beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get('#username.input').type('Username123')
        cy.get('#email').type('useranme123@ElementInternals.com')
        cy.get('input[data-cy="name"]').type('Anu')
        cy.get('input[data-testid="lastNameTestId"]').type('Koitmets')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')

        // Type confirmation password which is same as the first password
        cy.get('input[name="password"]').type('Password1')
        cy.get('[name="confirm"]').type('Password1')
        
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        cy.get('h2').contains('Password').click()

        // Assert that the error message is not visible anymore and the submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible').should('contain', 'Passwords do not match!')


    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username.input').type('Username123')
        cy.get('#email').type('username@imeil.com')
        cy.get('input[data-cy="name"]').type('Anu')
        cy.get('input[data-testid="lastNameTestId"]').type('Koitmets')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="password"]').type('Password1')
        cy.get('[name="confirm"]').type('Password1')

        cy.get('#htmlFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#cars').select('Saab')
        cy.get('#animal').select('Cat')

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled').click()

        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username.input').type('Username123')
        cy.get('#email').type('username@imeil.com')
        cy.get('input[data-cy="name"]').type('Anu')
        cy.get('input[data-testid="lastNameTestId"]').type('Koitmets')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="password"]').type('Password1')
        cy.get('[name="confirm"]').type('Password1')

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()

        // Assert that after submitting the form system shows successful message
    })

    it('Input valid data to the page', () => {
        inputValidData

        cy.get('.submit_button').should('be.disabled')

    })

    // You can add more similar tests for checking other mandatory field's absence

    it('Input valid data to the page2', ()=>{
        // Add test steps for filling in most of the mandatory fields
        cy.get('#username.input').type('Username123')
        cy.get('#email').type('username@imeil.com')
        cy.get('input[data-cy="name"]').type('Anu')
        cy.get('input[data-testid="lastNameTestId"]')
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789')
        cy.get('input[name="password"]').type('Password1')
        cy.get('[name="confirm"]').type('Password1')

        // Assert that submit button is disabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png')
        // get element and check its parameter height, to be equal 88
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.equal', 88)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

        // Create similar test for checking second link to Cerebrum Hub homepage
        // Check that URL to Cerebrum Hub page is correct and clickable
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()

        // Check that currently opened URL is correct
        cy.wait(5000)
        cy.url().should('contain', 'https://cerebrumhub.com/')

        // Go back to previous page
        cy.wait(5000)
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

        // Create test according to the instructions in LMS (only in practicing purposes)
    it.skip('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 3 elements in total and unchecked
        //Verify the label of each checkbox (similar to the existing radio button visual test)
        cy.get('input[type="radio"]').should('have.length', 3)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')

        //Try marking the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('be.checked')

    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.viewport(1280, 720)
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


        // Create test similar to previous one
    it('Animal dropdown is correct', () => {
        // Here are given different solutions how to get the length of array of elements in Animals dropdown
        // Next 2 lines of code do exactly the same!
        // Verify that the animal dropdown has six choices
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Verify all values in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}