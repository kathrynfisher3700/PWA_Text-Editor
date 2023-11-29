import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Exports the function to the database
export const putDb = async (content) =>  {
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

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
