import { computed } from 'vue'
import { defineStore } from 'pinia'
import Dungeons from '../dungeons'
import type { Dungeon } from '@/dungeons/Dungeon'

export const useGameStore = defineStore('game', () => {
  const state = computed(() =>
    Dungeons.reduce(
      (state, dungeon) => {
        state[dungeon.id] = {
          finished: 0,
          dungeon
        }
        return state
      },
      {} as { [id: string]: { dungeon: Dungeon; finished: number } }
    )
  )

  function increment(id: string) {
    state.value[id].finished += 1
  }

  function reset() {
    for (const dungeon of Object.values(state.value)) {
      dungeon.finished = 0
    }
    return state
  }

  return { state, increment, reset }
})
