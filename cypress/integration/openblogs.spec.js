import {login} from "./SigninForm.spec";

describe("Open other user blog posts", () => {
    it( "Can navigate other blog posts and scroll and or click", () => {
        login();
        cy.get('.ml-auto > :nth-child(1) > .nav-link').click(); // navigate to the blogs page
        cy.get(':nth-child(1) > .lead > header > a > .pt-3').click(); // click on the top blog post
        cy.get('.lead > a').click(); //check author profile
        cy.get('.ml-auto > :nth-child(1) > .nav-link').click(); // back to the blogs page
        cy.get('[href="/categories/technology"]').click(); // clicking the categories to see if any categories load
        cy.get('a > .pt-3').click(); //opening a blog post through categories
    })
});