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
              to="/foo"
              class="button button-primary"
              @click=""
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
const isLoading = ref(false)
const currentLayout = ref({
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
</script>
