describe("Sign up page and form test", () => {
    it( "Can fill in the form", () => {
        cy.visit("http://localhost:3000/signup");
        cy.get('form > :nth-child(1) > .form-control').type("Cypress").should("have.value", "Cypress");
        cy.get(':nth-child(2) > .form-control').type("cypress@gmail.com").should("have.value", "cypress@gmail.com");
        cy.get(':nth-child(3) > .form-control').type("password").should("have.value", "password");
        cy.get('form > :nth-child(4) > .btn').click();
        // Due to testing the email is already taken therefore next go to the signin page
        cy.contains("Email is taken")
        cy.get(':nth-child(2) > .nav-link').click()
        cy.url().should("include", "/signin")
        });
    })