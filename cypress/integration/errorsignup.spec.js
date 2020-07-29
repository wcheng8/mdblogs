describe("Sign up page and form test error handling", () => {
    it( "Fill in form and see user errors", () => {
        cy.visit("http://localhost:3000/signup");
        cy.get('form > :nth-child(4) > .btn').click();
        cy.contains("Fields can not be empty");
        cy.get('form > :nth-child(1) > .form-control').type("Cypress").should("have.value", "Cypress");
        cy.get('form > :nth-child(4) > .btn').click();
        cy.get(':nth-child(2) > .form-control').type("cypress@gmail.com").should("have.value", "cypress@gmail.com");
        cy.get('form > :nth-child(4) > .btn').click();
        cy.get(':nth-child(3) > .form-control').type("password").should("have.value", "password");
        cy.get('form > :nth-child(4) > .btn').click();
        cy.contains("Email is taken");
        });
    })