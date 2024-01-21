
import { layoutList } from '@/helpers/initialObject'

export const dbName = 'horoshopDb'
export const storeName = 'horoshop'

const request = indexedDB.open(dbName, 1)

request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
  const db = (event.target as any).result as IDBDatabase

  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(
      storeName,
      { keyPath: 'id', autoIncrement: true }
    )
  }
}

request.onerror = (event: Event) => {
  console.error("Database error: ", (event.target as any).errorCode)
}
export function deleteDatabase(): void {
  const deleteRequest = indexedDB.deleteDatabase(dbName);

  deleteRequest.onsuccess = () => {
    console.log("Database deleted successfully");
  };

  deleteRequest.onerror = (error: Event) => {
    console.error("Error deleting the database: ", (error.target as any).error);
  };
}
export function initialDb () {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = (event: Event) => {
    const db = (event.target as any).result as IDBDatabase;
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    const countRequest = store.count();

    countRequest.onsuccess = () => {
      const count = countRequest.result;

      if (count > 0) {
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
          console.log("Database cleared successfully")
        }
        clearRequest.onerror = (error: Event) => {
          console.error("Error clearing the database: ", (error.target as any).error)
        }
      }
      for (const item of layoutList) {
        const addRequest = store.add(item)

        addRequest.onerror = (error: Event) => {
          console.error("Error adding item to the database: ", (error.target as any).error)
        }
      }
      console.log("Database initialized successfully")
    }

    countRequest.onerror = (error: Event) => {
      console.error("Error counting records in the database: ", (error.target as any).error)
    }
  }
}