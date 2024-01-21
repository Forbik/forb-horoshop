import { defineStore } from 'pinia'
import type { LayoutItem } from '@/types/layouts'

type State = {
  layouts: LayoutItem[],
  currentLayout: LayoutItem | undefined,
  isLoading: boolean
}

export const useLayoutStore = defineStore('layout', {
  state: (): State => ({
    layouts: [] as LayoutItem[],
    currentLayout: {} as LayoutItem,
    isLoading: false
  })
})
