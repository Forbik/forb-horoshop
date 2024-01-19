<template>
  <div class="card">
    <figure class="card__image">
      <router-link :to="`/details/${layout?.id}`" class="card__link">
        <img :src="previewImage" alt="">
      </router-link>
    </figure>
    <div class="card__title">
      <div class="card__id">{{ layout?.number }}</div>
      <div class="card__name">{{ layout?.name }}</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, ref } from 'vue'
import type { LayoutItem } from '@/types/layouts'
const props = defineProps<{
  layout: LayoutItem
}>()

const layout = ref<LayoutItem | null>(null)
layout.value = props.layout
const previewImage = computed(() => {
  return props.layout?.images[0] || 'images/not_found.jpg';
})
</script>
