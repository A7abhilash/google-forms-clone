const FormsApp = artifacts.require("./FormsApp.sol");

require("chai").use(require("chai-as-promised")).should();

contract("FormsApp", (accounts) => {
  let formsApp;

  before(async () => {
    formsApp = await FormsApp.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await formsApp.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await formsApp.name();
      assert.equal(name, "FormsApp");
    });
  });

  describe("form", async () => {
    let result;

    it("creates form", async () => {
      result = await formsApp.createForm(
        "Form-1",
        "Description of form 1",
        "16034930300",
        "google-id-1",
        true,
        4,
        [
          { id: 1, title: "Field-1" },
          { id: 2, title: "Field-2" },
          { id: 3, title: "Field-3" },
          { id: 4, title: "Field-4" },
        ]
      );

      //   console.log(result.logs[0].args);
    });
  });
});
