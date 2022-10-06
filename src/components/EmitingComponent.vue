<script setup lang="ts">
const emit = defineEmits<{
  (e: 'basicEmit', payload: string): void
}>()
emit('basicEmit', 'payload')
emit('basicEmit', 'payload2')
</script>

<template>
  <div>
    <h1>
      Mouting Component
    </h1>
  </div>
</template>

