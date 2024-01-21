<template>
  <div class="input-group">
    <div class="input-row">
      <input
        class="input-field"
        :class="{ 'error': errors.number }"
        placeholder="###"
        style="max-width: 80px;"
        type="text"
        v-model="layout.number"
        @input="updateUrlInput"
      >
      <input
        class="input-field"
        :class="{ 'error': errors.name }"
        placeholder="Назва дизайну"
        type="text"
        v-model="layout.name"
      >
    </div>
    <input
      class="input-field"
      :class="{ 'error': errors.url }"
      placeholder="https://design###.horoshop.ua/"
      type="text"
      v-model="layout.url"
    >
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, onBeforeUnmount } from 'vue'

import type { LayoutItem } from '@/types/layouts'
import { useValidationStore } from '@/stores/validation'

const props = defineProps<{
  modelValue: LayoutItem
}>()

const validationStore = useValidationStore()
const layout = reactive(props.modelValue)

const errors = computed(() => validationStore.errors)

const updateUrlInput = () => {
  const number = parseInt(layout.number, 10);
  if (!isNaN(number)) {
    layout.url = `https://design${number}.horoshop.ua/`;
  } else {
    layout.url = '';
  }
}
onBeforeUnmount(() => {
  validationStore.errors = {}
})
</script>
