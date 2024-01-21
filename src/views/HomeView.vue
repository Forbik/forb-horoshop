<template>
  <div class="home">
    <div class="container">
      <HomeAppBar />
      <div class="cards-section">
        <AppLoader v-if="isLoading" />
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
import { onMounted, computed, ref, reactive } from 'vue'
import { useLayoutStore } from '@/stores/layouts'
import type { LayoutItem } from '@/types/layouts'
import useRequest from '@/composables/useRequest'

import HomeAppBar from '@/components/Home/AppBar.vue'
import HomeAppCard from '@/components/Home/AppCard.vue'
import AppLoader from '@/components/AppLoader.vue'

const appStore = useLayoutStore()

let layouts = reactive<LayoutItem[]>([])
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
  layouts = data
}
</script>
