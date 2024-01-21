<template>
  <div class="layout-details__toggle">
    <label class="circle-checkbox">
      <input v-model="layout.isPublished" class="circle-checkbox__input" type="checkbox">
      <div class="circle-checkbox__wrapper" >
        <div class="circle-checkbox__circle"></div>
      </div>
    </label>
    <span
      class="layout-details__toggle-text"
      :class="{ published: layout.isPublished }"
    >{{ isPublishedText }}</span>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'

import type { LayoutItem } from '@/types/layouts'

const props = defineProps<{
  modelValue: LayoutItem
}>()

const layout = reactive(props.modelValue)
const isPublishedText = computed(
  () => layout.isPublished ? 'Опублікований' : 'Неопублікований'
)
</script>
