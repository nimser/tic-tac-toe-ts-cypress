import App from "../../src/App"

beforeEach(() => {
  cy.mount(<App />)
})
describe("App.cy.tsx", () => {
  it("should load the grid", () => {
    cy.getByData("cell-0-0").should("exist")
    cy.getByData("cell-2-2").should("exist")
  })

  it("should add a X when first user clicks on the grid", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
  })

  it("should add a O when second user clicks on the grid", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("O")
  })
  it("should prevent ticking a previously ticked cell", () => {
    cy.getByData("cell-1-2").click()
    cy.getByData("cell-1-2").contains("X")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("O")
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-2-2").contains("O")
  })

  it("should say player 1 wins", () => {
    cy.getByData("cell-0-0").click()
    cy.getByData("cell-1-1").click()
    cy.getByData("cell-0-1").click()
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-0-2").click()
    cy.contains("Player 1 WINS")
  })
  it("should say player 2 wins", () => {
    cy.getByData("cell-0-1").click()
    cy.getByData("cell-0-0").click()
    cy.getByData("cell-0-2").click()
    cy.getByData("cell-2-2").click()
    cy.getByData("cell-1-0").click()
    cy.getByData("cell-1-1").click()

    cy.contains("Player 2 WINS")
  })
})
