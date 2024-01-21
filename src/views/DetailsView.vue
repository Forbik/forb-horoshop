<template>
  <div class="container">
    <AppLoader v-if="isLoading" />
    <div v-else class="layout-details">
      <div
        class="layout-details__back clickable"
        @click="$router.go(-1)"
      >
        <IconBack />
      </div>
      <div class="layout-details__main">
        <div class="layout-details__bar">
          <AppCheckbox
            v-model="currentLayout"
          />
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
import { onMounted, ref, toRaw, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LayoutItem } from '@/types/layouts'
import type { ValidationErrors } from '@/types/errors'
import { useLayoutStore } from '@/stores/layouts'
import { useValidationStore } from '@/stores/validation'
import useRequest from '@/composables/useRequest'

import IconBack from '@/components/icons/IconBack.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppInputs from '@/components/details/AppInputs.vue'
import AppCheckbox from '@/components/details/AppCheckbox.vue'
import AppImageGallery from '@/components/details/AppImageGallery.vue'

const appStore = useLayoutStore()
const validationStore = useValidationStore()
const route = useRoute()
const router = useRouter()

const currentLayout = ref<LayoutItem>({
  id: 1,
  number: '',
  name: '',
  url: '',
  images: [],
  isPublished: false
})
const lengthLayouts = appStore.layouts.length
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
    const validation = validateLayout(toRaw(currentLayout.value))
    if (!validation.isValid) {
      console.warn('Invalid layout data:', validation.errors)
      return
    }
    const resp = await useRequest.addLayout(toRaw(currentLayout.value)) as LayoutItem
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
  if (!currentLayout.value.id) { return }
  try {
    const validation = validateLayout(currentLayout.value)
    if (!validation.isValid) {
      console.warn('Invalid layout data:', validation.errors)
      return
    }
    const resp = await useRequest.updateLayout(currentLayout.value.id, toRaw(currentLayout.value)) as LayoutItem
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
    currentLayout.value = resp
  } catch (err) {
    console.warn(err)
  } finally {
    appStore.isLoading = false
  }
}
const validateLayout = (layout: LayoutItem): { isValid: boolean; errors: string[] } => {
  const errors: ValidationErrors = {}

  if (!layout.number || typeof layout.number !== 'string' || !/^\d+$/.test(layout.number)) {
    errors.number = { message: 'Введіть номер' };
  }

  if (!layout.name || typeof layout.name !== 'string') {
    errors.name = { message: 'Введіть назву дизайну' }
  }

  if (!layout.url || typeof layout.url !== 'string') {
    errors.url = { message: 'Введіть URL дизайну' }
  }
  validationStore.errors = errors
  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors: [] };
  }
  return { isValid: true, errors: [] }
}
</script>
