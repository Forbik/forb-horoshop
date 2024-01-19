import type { LayoutItem } from '@/types/layouts'
import { ostrovImage, floraImage, sunwearImage } from '@/helpers/imagesBase64Format'

const layoutList: LayoutItem[] = [
  {
    id: 1,
    number: '100',
    name: 'Ostrov',
    url: 'url1',
    images: [
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 2,
    number: '101',
    name: 'Flora',
    url: 'url1',
    images: [
      `${floraImage}`
    ],
    isPublished: false
  },
  {
    id: 3,
    number: '102',
    name: 'SunWear',
    url: 'url1',
    images: [
      `${sunwearImage}`
    ],
    isPublished: true
  },
  {
    id: 4,
    number: '103',
    name: 'Flora',
    url: 'url1',
    images: [
      `${floraImage}`
    ],
    isPublished: true
  },
  {
    id: 5,
    number: '104',
    name: 'Flora',
    url: 'url1',
    images: [
      `${floraImage}`
    ],
    isPublished: true
  },
  {
    id: 6,
    number: '105',
    name: 'SunWear',
    url: 'url1',
    images: [
      `${sunwearImage}`
    ],
    isPublished: true
  },
  {
    id: 7,
    number: '106',
    name: 'Ostrov',
    url: 'url1',
    images: [
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 8,
    number: '107',
    name: 'SunWear',
    url: 'url1',
    images: [
    ],
    isPublished: true
  }
]
export default {
  async getLayouts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(layoutList)
      }, 500)
    })
  },
  async getLayout(id: number) {
    return new Promise((resolve) => {
      const resp = layoutList.find((layout) => layout.id === id)
      setTimeout(() => {
        resolve(resp)
      }, 500)
    })
  },
  async removeLayout(id: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexToRemove = layoutList.findIndex(item => item.id === id)
        if (indexToRemove !== -1) {
          layoutList.splice(indexToRemove, 1)
          resolve(true)
        } else {
          throw new Error(`Item with id ${id} not found in layoutList.`)
        }
      }, 500)
    })
  },
  async updateLayout(id: number, newData: LayoutItem) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexToUpdate = layoutList.findIndex(item => item.id === id)
        if (indexToUpdate !== -1) {
          layoutList[indexToUpdate] = { ...layoutList[indexToUpdate], ...newData }
          resolve(true)
        } else {
          throw new Error(`Item with id ${id} not found in layoutList.`)
        }
      }, 500)
    })
  },
  async addLayout(newData: LayoutItem) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lastItem = layoutList[layoutList.length - 1]
        const newId = lastItem ? lastItem.id + 1 : 1
        const newItem: LayoutItem = {
          ...newData,
          id: newId,
        }
        layoutList.push(newItem)
        resolve(layoutList)
      }, 500)
    })
  }
}