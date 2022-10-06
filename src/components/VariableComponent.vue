<script setup lang="ts">
const props = defineProps({
  propNumber: {
    type: Number,
    required: true,
  },
})

const numberVariable = ref(0)

const computedOnePlusOne = computed((): number => 1 + 1)

watch(
  () => props.propNumber,
  (newVal) => {
    numberVariable.value = newVal
  },
)
</script>

<template>
  <div>
    <h1>
      Variable Component
    </h1>
  </div>
</template>

