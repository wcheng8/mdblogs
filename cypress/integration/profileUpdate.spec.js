import {login} from "./SigninForm.spec"

describe("Edit user details", () => {
    it( "Can navigate to user profile and change details", () => {
        login()
        cy.visit("http://localhost:3000/user");
        cy.get('.list-group > :nth-child(3) > a').click(); // navigate to user page
        cy.get(':nth-child(2) > .form-control').type("cypress"); //username field
        cy.get(':nth-child(5) > .form-control').type("About me... well I am a test"); //about field
        cy.get(':nth-child(7) > .btn').click(); // submit button
        cy.get(':nth-child(2) > .nav-link').click(); // click to test nav bar to dashboard
        cy.get('.list-group > :nth-child(3) > a').click(); // navigate back to update page to check new fields are there
        cy.contains("About me... well I am a test")
        });
    })