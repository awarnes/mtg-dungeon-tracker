import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type DungeonRoom = {
  name: string;
  effect: string;
}

type Dungeon = {
  name: string;
  currentRoom: number;
  rooms: DungeonRoom[];
}

export const useGameStore = defineStore('game', () => {


  return { count, doubleCount, increment }
})
