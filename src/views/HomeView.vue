<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed, ref } from 'vue'

const store = useGameStore()

const completed = computed(() => {
  console.log('CALCULATING')
  return Object.values(store.state).reduce((sum, { finished }) => {
    sum += finished
    return sum
  }, 0)
})

const resetModal = ref(null)

function handleReset() {
  store.reset()
  resetModal.value.close()
}
</script>

<template>
  <div id="home">
    <div id="score-board">
      <h1></h1>
      <h2>Dungeons completed: {{ completed }}</h2>
      <button class="green" @click="() => resetModal.showModal()">Reset</button>
    </div>
    <div id="dungeon-links">
      <RouterLink
        v-for="[id, data] in Object.entries(store.state)"
        :to="`/dungeon/${id}`"
        :key="id"
      >
        {{ data.dungeon.name }} - {{ data.finished }}
      </RouterLink>
    </div>
  </div>
  <dialog id="reset-modal" ref="resetModal">
    <p>Are you sure you want to reset the game?</p>
    <div id="modal-actions">
      <button @click="handleReset">Ok</button>
      <button @click="() => resetModal.close()">Cancel</button>
    </div>
  </dialog>
</template>

<style lang="css">
#home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#score-board {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#dungeon-links {
  margin-top: 5em;
  font-size: xx-large;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#reset-modal {
  --unit: 12em;
  position: absolute;
  width: calc(2 * var(--unit));
  height: var(--unit / 2);
  top: calc(50% - var(--unit) / 2);
  left: calc(50% - var(--unit));
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #modal-actions {
    width: 100%;

    display: flex;
    justify-content: end;

    padding: 1em 1em;
  }
}
</style>
