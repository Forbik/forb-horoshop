<template>
  <div class="container">
    <AppLoader v-if="isLoading" />
    <div v-else class="layout-details">
      <div class="layout-details__back clickable">
        <IconBack
          @click="$router.go(-1)"
        />
      </div>
      <div class="layout-details__main">
        <div class="layout-details__bar">
          <div class="layout-details__toggle">
            <label class="circle-checkbox">
              <input v-model="currentLayout.isPublished" class="circle-checkbox__input" type="checkbox">
              <div class="circle-checkbox__wrapper" >
                <div class="circle-checkbox__circle"></div>
              </div>
            </label>
            <span class="layout-details__toggle-text">{{ isPublished }}</span>
          </div>
          <div class="layout-details__btns">
            <button
              v-if="!isAddLayoutPage"
              class="button button-secondary"
              @click="removeLayout(currentLayout.id || lengthLayouts + 1)"
            >
              Видалити
            </button>
            <button
              to="/foo"
              class="button button-primary"
              @click="isAddLayoutPage ? addLayout() : updateLayout()"
            >
              Зберегти і вийти
            </button>
          </div>
        </div>
        <div class="layout-details__content">
          <AppImageGallery v-model="currentLayout.images" />
          <AppInputs v-model="currentLayout" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRaw, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LayoutItem } from '@/types/layouts'
import type { ValidationErrors } from '@/types/errors'
import { useLayoutStore } from '@/stores/layouts'
import { useValidationStore } from '@/stores/validation'
import useRequest from '@/composables/useRequest'

import IconBack from '@/components/icons/IconBack.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppInputs from '@/components/AppInputs.vue'
import AppImageGallery from '@/components/AppImageGallery.vue'

const appStore = useLayoutStore()
const validationStore = useValidationStore()
const route = useRoute()
const router = useRouter()

let currentLayout = reactive<LayoutItem>({
  id: 1,
  number: '',
  name: '',
  url: '',
  images: [],
  isPublished: false
})
const lengthLayouts = appStore.layouts.length
const isPublished = computed(
  () => currentLayout.isPublished ? 'Опублікований' : 'Неопублікований'
)
const isLoading = computed(() => appStore.isLoading)
const isAddLayoutPage = computed(() => route.name === `add-layout`)

onMounted(async () => {
  const layoutId = parseInt(route.params.id as string, 10)
  if (layoutId) {
    appStore.isLoading = true
    await fetchLayout(layoutId)
  }
})
const removeLayout = async (id:number) => {
  appStore.isLoading = true
  try {
    const resp = await useRequest.removeLayout(id) as LayoutItem
    if (resp) {
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
  } finally {
    appStore.isLoading = false
  }
}
const addLayout = async () => {
  appStore.isLoading = true
  try {
    const validation = validateLayout(toRaw(currentLayout))
    if (!validation.isValid) {
      console.warn('Invalid layout data:', validation.errors)
      return
    }
    const resp = await useRequest.addLayout(toRaw(currentLayout)) as LayoutItem
    if (resp) {
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
  } finally {
    appStore.isLoading = false
  }
}
const updateLayout = async () => {
  appStore.isLoading = true
  if (!currentLayout.id) { return }
  try {
    const validation = validateLayout(toRaw(currentLayout))
    if (!validation.isValid) {
      console.warn('Invalid layout data:', validation.errors)
      return
    }
    const resp = await useRequest.updateLayout(currentLayout.id, currentLayout) as LayoutItem
    if (resp) {
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
  } finally {
    appStore.isLoading = false
  }
}
async function fetchLayout (id: number) {
  try {
    const resp = await useRequest.getLayout(id) as LayoutItem
    if (!resp) {
      router.push('/')
    }
    appStore.currentLayout = resp
    currentLayout = resp
  } catch (err) {
    console.warn(err)
  } finally {
    appStore.isLoading = false
  }
}
const validateLayout = (layout: LayoutItem): { isValid: boolean; errors: string[] } => {
  const errors: ValidationErrors = {}

  if (!layout.number || typeof layout.number !== 'string' || !/^\d+$/.test(layout.number)) {
    errors.number = { message: 'Number is required and must be a number.' };
  }

  if (!layout.name || typeof layout.name !== 'string') {
    errors.name = { message: 'Name is required and must be a string.' }
  }

  if (!layout.url || typeof layout.url !== 'string') {
    errors.url = { message: 'URL is required and must be a string.' }
  }
  validationStore.errors = errors
  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors: [] };
  }
  return { isValid: true, errors: [] }
}
</script>
