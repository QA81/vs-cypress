/// <reference types="Cypress"/>
import { createNewBoardPage } from "../POM/createNewBoardPage";
import { faker } from "@faker-js/faker";

describe("create board test", () => {
  beforeEach("login via backend", () => {
    cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
      "loadMyOrganizations"
    );
    cy.loginViaBackend();
    cy.visit("/my-organizations");
    createNewBoardPage.firstOrg.click();
    cy.wait("@loadMyOrganizations").then((interception) => {
      let orgId = interception.response.body[0].id;
      expect(interception.response.statusCode).eq(200);
      cy.get("button").contains("OK").click();
      cy.url().should("contain", `/organizations/${orgId}/boards`);
    });
  });

  it("create new board", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/boards`).as("boardCreation");
    let boardTitle = faker.lorem.word();
    createNewBoardPage.addNewBoard.click();
    createNewBoardPage.modalWindowHeader.should("contain", "New Board");
    createNewBoardPage.boardTitleInput.type(boardTitle);
    createNewBoardPage.actionBtn.click();
    createNewBoardPage.radioCheck.click();
    createNewBoardPage.actionBtn.click();
    createNewBoardPage.actionBtn.click();
    createNewBoardPage.actionBtn.click();
    createNewBoardPage.actionBtn.click();
    createNewBoardPage.boardTitle.should("contain", boardTitle);
    cy.wait("@boardCreation").then((interception) => {
      let boardId = interception.response.body.id;
      expect(interception.response.statusCode).eq(201);
      cy.url().should("contain", `/boards/${boardId}`);
    });
  });
});
