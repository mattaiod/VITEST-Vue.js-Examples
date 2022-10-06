<script setup lang="ts">
import { AGE_SYMBOL } from '~/controllers/symbol'

const injectedValue = inject(AGE_SYMBOL)
</script>

<template>
  <div>
    <h1>Providing Component</h1>
  </div>
</template>

