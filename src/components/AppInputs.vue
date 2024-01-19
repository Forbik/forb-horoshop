<template>
  <div class="input-group">
    <div class="input-row">
      <input
        class="input-field"
        placeholder="###"
        style="max-width: 80px;"
        type="text"
        v-model="layout.number"
      >
      <input
        class="input-field"
        placeholder="Назва дизайну"
        type="text"
        v-model="layout.name"
      >
    </div>
    <input
      class="input-field"
      placeholder="https://design###.horoshop.ua/"
      type="text"
      v-model="layout.url"
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { LayoutItem } from '@/types/layouts'
const props = defineProps<{
  modelValue: LayoutItem
}>()
const layout = ref(props.modelValue)
</script>
