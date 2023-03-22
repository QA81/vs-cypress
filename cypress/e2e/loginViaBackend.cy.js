/// <reference types="Cypress" />

import { loginPage } from "../POM/loginPage";

describe("login test via backend", () => {
  it("login via backend", () => {
    cy.loginViaBackend();
    cy.visit("/");
    loginPage.myOrganizationHeader.should("have.text","My Organizations");
    
  });
});
