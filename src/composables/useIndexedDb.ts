import { dbName, storeName } from '@/composables/db'
import type { LayoutItem } from '@/types/layouts'

export default {
  async getLayouts () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)
    
      request.onsuccess = (event: Event) => {
        const db = (event.target as any).result as IDBDatabase;
        const transaction = db.transaction(storeName, 'readonly')
        const store = transaction.objectStore(storeName)
    
        const getAllRequest = store.getAll()

    
        getAllRequest.onsuccess = () => {
          const items: LayoutItem[] = getAllRequest.result;
          resolve(items)
        }
    
        getAllRequest.onerror = (error: Event) => {
          const errorMessage = (error.target as any).error
          reject(new Error(`Error getting items from the database: ${errorMessage}`))
        }
      }
    })
  },
  async getLayoutById (itemId: number) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)
    
      request.onsuccess = (event: Event) => {
        const db = (event.target as any).result as IDBDatabase;
        const transaction = db.transaction(storeName, 'readonly')
        const store = transaction.objectStore(storeName)
    
        const getRequest = store.get(itemId)
    
        getRequest.onsuccess = () => {
          const item: LayoutItem | null = getRequest.result;
          resolve(item)
        };
    
        getRequest.onerror = (error: Event) => {
          const errorMessage = (error.target as any).error
          reject(new Error(`Error getting item by ID: ${errorMessage}`))
        }
      }
    })
  },
  async updateLayoutById (id: number, updatedData: LayoutItem) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)

      request.onsuccess = (event: Event) => {
        const db = (event.target as any).result as IDBDatabase
        const transaction = db.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
    
        const getRequest = store.get(id)
    
        getRequest.onsuccess = () => {
          const existingItem: LayoutItem = getRequest.result;
    
          if (existingItem) {
            const updatedItem: LayoutItem = { ...existingItem, ...updatedData }
            const putRequest = store.put(updatedItem)
    
            putRequest.onsuccess = () => {
              console.log(`Item with ID ${id} updated successfully`)
              resolve(true)
            }
    
            putRequest.onerror = (error: Event) => {
              const errorMessage = (error.target as any).error
              reject(new Error(`Error updating item with ID ${id}: ${errorMessage}`))
            }
          } else {
            reject(new Error(`Item with ID ${id} not found`))
          }
        };
    
        getRequest.onerror = (error: Event) => {
          const errorMessage = (error.target as any).error
          reject(new Error(`Error getting item with ID ${id}: ${errorMessage}`))
        }
      }
    })
  },
  async removeLayoutById (id: number) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)
    
      request.onsuccess = (event: Event) => {
        const db = (event.target as any).result as IDBDatabase
        const transaction = db.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
    
        const deleteRequest = store.delete(id)
    
        deleteRequest.onsuccess = () => {
          console.log(`Item with ID ${id} deleted successfully`)
          resolve(true)
        }
    
        deleteRequest.onerror = (error: Event) => {
          const errorMessage = (error.target as any).error
          reject(new Error(`Error deleting item from the database: ${errorMessage}`))
        }
      }
    })
  },
  async addLayout (newData: LayoutItem) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)
    
      request.onsuccess = (event: Event) => {
        const db = (event.target as any).result as IDBDatabase;
        const transaction = db.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
        delete newData.id
        const addRequest = store.add(newData)
    
        addRequest.onsuccess = () => {
          console.log("Item added successfully")
          resolve(true)
        }
    
        addRequest.onerror = (error: Event) => {
          const errorMessage = (error.target as any).error
          reject(new Error(`Error adding item to the database: ${errorMessage}`))
        }
      }
    })
  }
}