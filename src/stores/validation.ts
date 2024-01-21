import { defineStore } from 'pinia'
import type { ValidationErrors } from '@/types/errors'

type State = {
  errors: ValidationErrors
}

export const useValidationStore = defineStore('validation', {
  state: (): State => ({
    errors: {} as ValidationErrors
  })
})
