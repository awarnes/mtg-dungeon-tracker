<script setup lang="ts">
const props = defineProps<{
  id: string
  name: string
  effect: string
  disabled: boolean
  active: boolean
  venture: (id: string) => void
}>()

defineExpose({
  apple: () => console.log(props.name)
})
</script>

<template>
  <button
    :id="props.id"
    :disabled="props.disabled"
    :class="active ? 'active' : ''"
    @click="() => venture(props.id)"
  >
    <h2>{{ props.name }}</h2>
    <h3>{{ props.effect }}</h3>
  </button>
</template>

<style>
.active {
  border-color: green;
  background-color: white;
}
</style>
