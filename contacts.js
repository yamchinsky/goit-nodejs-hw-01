const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    console.table(data);
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      error.message = "Неправильное имя или путь к файлу";
    }
    if (error.message.includes("Unexpected token")) {
      error.message = "Неправильный формат JSON-файла";
    }

    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    const idData = data.find((item) => item.id === contactId);
    console.table(idData);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    const newData = data.filter(({ _id }) => _id !== contactId);
    const dataString = JSON.stringify(newData);
    fs.writeFile(contactsPath, dataString);
    console.table(newData);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    const newContact = { name, email, phone, _id: v4() };
    data.push(newContact);
    const dataString = JSON.stringify(data);
    fs.writeFile(contactsPath, dataString);
    console.table(data);
  } catch (error) {
    throw error;
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
