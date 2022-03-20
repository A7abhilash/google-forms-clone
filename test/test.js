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

    before(async () => {
      await formsApp.createForm(
        "Form-10101",
        "Description of form 10101",
        "16034930300",
        true,
        3,
        [
          {
            id: 1,
            title: "Field-1",
            options: ["Option-11", "Option-12"],
            fieldType: "checkbox",
          },
          {
            id: 2,
            title: "Field-2",
            options: ["Option-21", "Option-22"],
            fieldType: "radio",
          },
          { id: 3, title: "Field-3", options: [""], fieldType: "text" },
        ],
        { from: accounts[0] }
      );
    });

    it("creates form", async () => {
      result = await formsApp.createForm(
        "Form-1",
        "Description of form 1",
        "16034930300",
        true,
        3,
        [
          {
            id: 1,
            title: "Field-1",
            options: ["Option-11", "Option-12"],
            fieldType: "checkbox",
          },
          {
            id: 2,
            title: "Field-2",
            options: ["Option-21", "Option-22"],
            fieldType: "radio",
          },
          { id: 3, title: "Field-3", options: [""], fieldType: "text" },
        ],
        { from: accounts[0] }
      );

      // console.log(result.logs[0].args);
      let count = await formsApp.formsCount();
      // console.log(count.toNumber());

      let form = await formsApp.forms(count.toNumber());
      // console.log(form);

      // let fields = [];
      // for (let i = 1; i <= form.fieldsCount.toNumber(); i++) {
      //   let field = await formsApp.fields(count.toNumber(), i);
      //   let options = [];
      //   for (let j = 0; j < 3; j++) {
      //     let option = field.options[j];
      //     options.push(option);
      //   }
      //   console.log(options);
      //   fields.push(field);
      // }

      // console.log(fields);
    });

    it("edits form", async () => {
      result = await formsApp.editForm(
        1,
        "Form-101",
        "Description of form 101",
        "16034930300s",
        false,
        4,
        [
          {
            id: 1,
            title: "Field-1",
            options: ["Option-11", "Option-12"],
            fieldType: "checkbox",
          },
          {
            id: 2,
            title: "Field-2",
            options: ["Option-21", "Option-22"],
            fieldType: "radio",
          },
          { id: 3, title: "Field-3", options: [""], fieldType: "text" },
          { id: 4, title: "Field-4", options: [""], fieldType: "text" },
        ],
        { from: accounts[0] }
      );

      // console.log(result.logs[0].args);
      let count = await formsApp.formsCount();
      // console.log(count.toNumber());

      let form = await formsApp.forms(count.toNumber());
      console.log(form);
    });

    it("gets all forms", async () => {
      result = await formsApp.getForms({ from: accounts[0] });
      console.log(result);
    });

    it("gets all fields of a form", async () => {
      result = await formsApp.getFields(1);
      console.log(result);
    });
  });
});
