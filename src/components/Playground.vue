<script setup lang="ts">
import { getName } from '~/controllers/playground'

const props = defineProps({
  propNumber: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emitter = defineEmits<{
  (e: 'emitValue', payload: number): void
}>()

const state = reactive({
  name: inject('name'),
})

const varToWatch = ref(1)
const varSimple = ref(1)

const computedOnePlusOne = computed((): number => 1 + 1)

const fnReturningAnImportedFunction = (): string => {
  return getName()
}
fnReturningAnImportedFunction()

const getNameToMock = getName

const fnEmpty = () => ''

watch(
  () => props.propNumber,
  (newVal) => {
    varSimple.value = newVal
  },
)

watch(
  () => varToWatch.value,
  (newVal) => {
    varSimple.value = newVal
  },
)
</script>

<template>
  <Provider />
</template>

