<template>
  <div class="image-gallery">
    <div v-if="images?.length" class="image-gallery__list">
      <VueDraggableNext class="image-gallery__list" :list="images" :options="dragOptions">
        <div
          v-for="(image, idx) of images"
          :key="idx + image"
        >
          <picture
            class="image-gallery__picture"
            :class="{'cursor-grab':images.length > 1}"
          >
            <img :src="image">
            <button class="image-gallery__trash" @click="removeImage(idx)">
              <IconTrash />
            </button>
          </picture>
        </div>
      </VueDraggableNext>
      <label class="image-gallery__add clickable">
        <IconPlus />
        <input type="file" @change="addImage" hidden>
      </label>
    </div>
    <label v-else class="image-gallery__empty clickable">
      <IconPicturesVue />
      <input type="file" @change="addImage" hidden>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

import IconPicturesVue from './icons/iconPictures.vue'
import IconTrash from './icons/IconTrash.vue';
import IconPlus from './icons/IconPlus.vue';

const props = defineProps<{
  modelValue: string[]
}>()
const dragOptions = computed(() => ({
  animation: 200,
  group: 'images',
  disabled: false
}))
const images = ref(props.modelValue)
const addImage = (event: Event) =>{
  const target = event.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  updateImage(file)
}
const updateImage = (file:File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    const src = reader.result as string
    images.value.push(src)
  }
}
const removeImage = (index:number) => {
  images.value.splice(index, 1)
}
</script>