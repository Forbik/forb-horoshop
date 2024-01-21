import type { LayoutItem } from '@/types/layouts'
import useIndexedDb from './useIndexedDb'

export default {
  async getLayouts() {
    try {
      return await useIndexedDb.getLayouts()
    } catch (err) {
      console.error(err)
    }
  },
  async getLayout(id: number) {
    try {
      return useIndexedDb.getLayoutById(id)
    } catch (err) {
      console.error(err)
    }
  },
  async updateLayout(id: number, newData: LayoutItem) {
    try {
      return useIndexedDb.updateLayoutById(id, newData)
    } catch (err) {
      console.error(err)
    }
  },
  async removeLayout(id: number) {
    try {
      return useIndexedDb.removeLayoutById(id)
    } catch (err) {
      console.error(err)
    }
  },
  async addLayout(newData: LayoutItem) {
    try {
      return useIndexedDb.addLayout(newData)
    } catch (err) {
      console.error(err)
    }
  }
}