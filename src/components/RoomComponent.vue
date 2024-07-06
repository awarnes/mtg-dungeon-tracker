<script setup lang="ts">
const props = defineProps<{
  id: string
  name: string
  effect: string
  disabled: boolean
  active: boolean
  visited?: boolean
  venture: (id: string) => void
}>()
</script>

<template>
  <button
    :id="props.id"
    :disabled="props.disabled"
    :class="active ? 'active' : visited ? 'visited' : ''"
    @click="() => venture(props.id)"
  >
    <h2>{{ props.name }}</h2>
    <h3>{{ props.effect }}</h3>
  </button>
</template>

<style>
.active {
  border-color: green;
  background-color: rgb(133, 224, 219);
}

.visited {
  border-color: rgb(130, 44, 44);
  background-color: rgb(232, 127, 127);
}
</style>
