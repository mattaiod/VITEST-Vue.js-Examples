<script setup lang="ts">
import { fnInside } from '~/controllers/functions'

const fnOutside = () => fnInside()
</script>

<template>
  <div>
    <h1>Spying Component</h1>
  </div>
</template>

