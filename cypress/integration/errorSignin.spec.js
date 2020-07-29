describe("SignIn page and form test for error handling", () => {
    it("Will try to sign in with incorrect details to test error handling", () => {
      cy.visit("http://localhost:3000/signin");
      cy.get("form > :nth-child(1) > .form-control").type("cypressError@gmail.com").should("have.value", "cypressError@gmail.com");
      cy.get(":nth-child(2) > .form-control").type("password").should("have.value", "password");
      cy.get(":nth-child(3) > .btn").click();
      cy.contains("User with that email does not exist. Please signup.");
    });
  });