import {login} from "./SigninForm.spec";

describe("Edit and delete blog from user dashboard", () => {
    it( "Can navigate to user dashboard, edit and delete blog posts", () => {
        login()
        cy.visit("http://localhost:3000/user");
        cy.get('.list-group > :nth-child(2) > a').click();
        cy.url().should("include", "/user/crud/blogs");
        cy.get('.ml-2').click();
        cy.get('form > :nth-child(1) > .form-control').type("UPDATED CYPRESS TEST BLOG");
        cy.get(':nth-child(3) > .btn').click();
        cy.get('.list-group > :nth-child(2) > a').click();
        cy.get('.btn-danger').click();
        cy.get('.form-control').type("UPDATED CYPRESS TEST BLOG");
        cy.get('.col-md-4 > .btn').click();
        cy.contains("0 blogs found")
        });
    })