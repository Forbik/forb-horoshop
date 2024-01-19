<template>
  <main class="layout">
    <AppNavigation />
    <div class="main">
      <RouterView />
    </div>
  </main>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from './components/AppNavigation.vue'
</script>
