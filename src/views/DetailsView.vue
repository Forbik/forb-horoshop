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
              @click="removeLayout(currentLayout.id)"
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
import { onMounted, onUnmounted, ref, reactive, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LayoutItem } from '@/types/layouts'
import { useLayoutStore } from '@/stores/layouts'
import useRequest from '@/composables/useRequest'
import IconBack from '@/components/icons/IconBack.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppInputs from '@/components/AppInputs.vue'
import AppImageGallery from '@/components/AppImageGallery.vue'

const appStore = useLayoutStore()
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

const isPublished = computed(
  () => currentLayout.value.isPublished ? 'Опублікований' : 'Неопублікований'
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
onUnmounted(() => {
  appStore.currentLayout = {} as LayoutItem
})
const removeLayout = async (id:number) => {
  appStore.isLoading = true
  try {
    const resp = await useRequest.removeLayout(id) as LayoutItem
    if (resp) {
      appStore.isLoading = false
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
  }
}
const addLayout = async () => {
  appStore.isLoading = true
  try {
    const resp = await useRequest.addLayout(currentLayout.value) as LayoutItem
    if (resp) {
      appStore.isLoading = false
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
  }
}
const updateLayout = async () => {
  appStore.isLoading = true
  try {
    const resp = await useRequest.updateLayout(currentLayout.value.id, currentLayout.value) as LayoutItem
    if (resp) {
      appStore.isLoading = false
      router.push('/')
    }
  } catch (err) {
    console.warn(err)
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
</script>
