import {login} from "./SigninForm.spec";

describe("Create blog from user dashboard", () => {
    it( "Can navigate to user dashboard and create blog post", () => {
        login()
        cy.visit("http://localhost:3000/user");
        cy.get('.list-group > :nth-child(1) > a').click();
        cy.url().should("include", "/user/crud/blog");
        cy.get('form > :nth-child(1) > .form-control').type("Cypress TEST BLOG");
        cy.get('.ql-editor').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus iaculis nibh non sodales. Nunc dolor arcu, lobortis in ultricies vitae, mollis eu odio. Cras at orci sem. Etiam sed risus dictum, iaculis mauris non, iaculis massa. Ut consectetur ac sem nec consectetur. Orci varius natoque penatibus et magnis dis.")
        cy.get(':nth-child(2) > ul > :nth-child(2) > .mr-2').click();
        cy.get(':nth-child(3) > ul > :nth-child(3) > .mr-2').click();
        cy.get(':nth-child(3) > .btn').click();
        });
    })