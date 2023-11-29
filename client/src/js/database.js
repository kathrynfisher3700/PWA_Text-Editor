import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Exports a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Creates a connection to the Jate database and version.
  const jateDb = await openDB("jate", 1);

  // Creates new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the put method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;
  console.log("Data saved to the database:", result);
};

// Exports a method that gets all the content from the database
export const getDb = async () => {
  // Creates a connection to the jate database and version.
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the get method to retrieve the value of the first record matching the query.
  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Successfully retrieved from database:", result.value)
    : console.log("Sorry, nothing found in database!");
  return result?.value;
};

initdb();
