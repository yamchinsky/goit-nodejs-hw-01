const jsonReader = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      jsonReader.listContacts();
      break;

    case "get":
      jsonReader.getContactById(id);
      break;

    case "add":
      jsonReader.addContact(name, email, phone);
      break;

    case "remove":
      jsonReader.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
