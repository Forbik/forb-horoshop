
<template>
  <nav class="navbar">
    <RouterLink to="/">
      <IconLogoVue />
    </RouterLink>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import IconLogoVue from './icons/IconLogo.vue';
</script>