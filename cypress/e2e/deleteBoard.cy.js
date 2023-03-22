/// <reference types="Cypress"/>
import { createNewBoardPage } from "../POM/createNewBoardPage";
import { deleteBoardPage } from "../POM/deleteBoardPage";
import { faker } from "@faker-js/faker";

describe("Board page case", () => {
  beforeEach(() => {
    let boardTitle = faker.lorem.word();
    cy.intercept("POST", `${Cypress.env("apiUrl")}/boards`).as("boardCreation");
    cy.intercept("DELETE", `${Cypress.env("apiUrl")}/boards/**`).as(
      "deletedBoard"
    );
    cy.loginViaBackend();
    cy.visit("/my-organizations");
    createNewBoardPage.createBoard(boardTitle);
    cy.get(".vs-c-boards-item__header").first().click();
  });

  it("Delete board", () => {
    cy.wait("@boardCreation").then((interception) => {
      let boardId = interception.response.body.id;
      expect(interception.response.statusCode).eq(201);
      cy.url().should("contain", `/boards/${boardId}`);
    });

    deleteBoardPage.configBoardBtn.click();
    deleteBoardPage.configSectionBtn.click();
    deleteBoardPage.yesBtn.click({ force: true });

    cy.wait("@deletedBoard").then((interception) => {
      let boardId = interception.response.body.id;
      expect(interception.response.statusCode).eq(200);
      cy.url().should("contain",`/boards/${boardId}`)
    });
  });
});
