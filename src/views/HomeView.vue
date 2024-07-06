<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
const { state } = useGameStore()

const completed = computed(() => {
  return Object.values(state).reduce((sum, { finished }) => {
    sum += finished
    return sum
  }, 0)
})
</script>

<template>
  <div id="home">
    <div id="score-board">
      <p>Dungeons completed: {{ completed }}</p>
    </div>
    <div id="dungeon-links">
      <RouterLink v-for="[id, data] in Object.entries(state)" :to="`/dungeon/${id}`" :key="id">
        {{ data.dungeon.name }} - {{ data.finished }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="css">
#home {
  display: flex;
  flex-direction: column;
}
#dungeon-links {
  margin-top: 5em;
  display: flex;
  flex-direction: column;
}
</style>
