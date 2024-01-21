<template>
  <div class="home">
    <AppLoader v-if="isLoading" />
    <div class="container">
      <HomeAppBar />
      <div class="cards-section">
        <HomeAppCard
          v-for="item of layouts"
          :key="`layout` + item.id"
          :layout="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useLayoutStore } from '@/stores/layouts'
import type { LayoutItem } from '@/types/layouts'
import useRequest from '@/composables/useRequest'

import AppLoader from '@/components/AppLoader.vue'
import HomeAppBar from '@/components/home/AppBar.vue'
import HomeAppCard from '@/components/home/AppCard.vue'

const appStore = useLayoutStore()

const layouts = ref<LayoutItem[]>([])
const isLoading = computed(() => appStore.isLoading)

onMounted(async () => {
  await fetchLayouts()
})
async function fetchLayouts () {
  try {
    appStore.isLoading = true
    const resp = await useRequest.getLayouts() as LayoutItem[]
    updateData(resp);
  } catch (err) {
    console.error(err)
  } finally {
    appStore.isLoading = false
  }
}
const updateData = (data: LayoutItem[]) => {
  appStore.layouts = data
  layouts.value = data
}
</script>
