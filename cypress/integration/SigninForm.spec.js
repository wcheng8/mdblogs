describe("SignIn page and form test", () => {
  it("Can fill in the form and sign in", () => {
    cy.visit("http://localhost:3000/signin");
    cy.get("form > :nth-child(1) > .form-control")
      .type("cypress@gmail.com")
      .should("have.value", "cypress@gmail.com");
    cy.get(":nth-child(2) > .form-control")
      .type("password")
      .should("have.value", "password");
    cy.get(":nth-child(3) > .btn").click();
    cy.url().should("include", "/user");
  });
});

export const login = () => {
  cy.visit("http://localhost:3000/signin");
  cy.get("form > :nth-child(1) > .form-control")
    .type("cypress@gmail.com")
    .should("have.value", "cypress@gmail.com");
  cy.get(":nth-child(2) > .form-control")
    .type("password")
    .should("have.value", "password");
  cy.get(":nth-child(3) > .btn").click();
  cy.url().should("include", "/user");
};
