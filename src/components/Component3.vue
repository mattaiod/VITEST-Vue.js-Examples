<script setup lang="ts">
import { emit } from 'process'
import { getName } from '~/controllers/functions'

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

const getNameToMock = getName

const fnEmpty = () => ''

const fnWithFnInside = () => {
  fnEmpty()
}

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

