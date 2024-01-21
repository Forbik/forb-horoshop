<template>
  <div class="input-group">
    <div class="input-row">
      <div class="input-group__item" style="max-width: 80px;">
        <input
          class="input-field"
          :class="{ 'error': errors.number }"
          placeholder="###"
          type="text"
          v-model="layout.number"
          @input="updateUrlInput"
        >
        <div class="input-group__error" v-if="errors.number">{{ errors.number.message }}</div>
      </div>
      <div class="input-group__item">
        <input
          class="input-field"
          :class="{ 'error': errors.name }"
          placeholder="Назва дизайну"
          type="text"
          v-model="layout.name"
        >
        <div class="input-group__error" v-if="errors.name">{{ errors.name.message }}</div>
      </div>
    </div>
    <div class="input-group__item">
      <input
        class="input-field"
        :class="{ 'error': errors.url }"
        placeholder="https://design###.horoshop.ua/"
        type="text"
        v-model="layout.url"
      >
      <div class="input-group__error" v-if="errors.url">{{ errors.url.message }}</div>
    </div>
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
