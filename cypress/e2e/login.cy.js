/// <reference types="Cypress" />
import { loginPage } from "../POM/loginPage";

describe("login test", () => {
  beforeEach("visit login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
    loginPage.loginHeader
      .should("be.visible")
      .and("have.text", "Log in with your existing account");
  });

  it("Login successfully with valid data", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/login`).as("logedon");
    cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
      "myorganizations"
    );
    loginPage.login(Cypress.env("testEmail"), Cypress.env("testPassword"));
    cy.wait("@logedon").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.body.token).to.exist;
    });

    loginPage.loginHeader.should("not.exist");
    loginPage.myOrganizationHeader.should("have.text","My Organizations");
    cy.url().should("include", "/my-organizations");
  });
});
