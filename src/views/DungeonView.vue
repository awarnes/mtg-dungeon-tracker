<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import RoomComponent from '@/components/RoomComponent.vue'
import EdgeComponent from '@/components/EdgeComponent.vue'
import { Room } from '@/dungeons/Dungeon'
import { useGameStore } from '@/stores/game'

const route = useRoute()
const router = useRouter()

const { state, increment } = useGameStore()

const displayEdges = ref([])

const currentDungeon = computed(() => {
  return state[route.params.id as string].dungeon
})

const currentRoom = ref<Room>(currentDungeon.value.rooms().next().value)
const finalRoom = computed(() => currentDungeon.value.topologicalSort().next().value)

function venture(id: string) {
  currentRoom.value = currentDungeon.value.getRoom(id)!
}

function handleCompleteDungeon() {
  increment(currentDungeon.value.id)
  router.push('/')
}

function getOffset(element: Element) {
  var rect = element.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height
  }
}

function createEdges(fromElement: Element, toElement: Element, color: string, thickness: number) {
  const offsetFrom = getOffset(fromElement)
  const offsetTo = getOffset(toElement)

  return {
    color,
    thickness,
    start: {
      x: offsetFrom.left + offsetFrom.width / 2,
      y: offsetFrom.top + offsetFrom.height
    },
    end: {
      x: offsetTo.left + offsetTo.width / 2,
      y: offsetTo.top
    }
  }
}

function connectNodes() {
  const roomRefs: { [k: string]: Element } = {}

  document.querySelectorAll('.room').forEach((room) => {
    roomRefs[room.id] = room
  })

  for (const [fromRoomId, fromRoomRef] of Object.entries(roomRefs)) {
    const toRooms = currentDungeon.value.getRoom(fromRoomId)?.rooms

    if (!toRooms) {
      continue
    }

    for (const toRoomId of toRooms) {
      const toRoomRef = roomRefs[toRoomId]

      displayEdges.value.push(createEdges(fromRoomRef, toRoomRef, 'yellow', 5))
    }
  }
}

onMounted(() => {
  connectNodes()
})
</script>

<template>
  <div id="container" class="columns" ref="dungeonView">
    <h1 id="title" ref="titleRef">{{ currentDungeon.name }}</h1>
    <div id="rooms">
      <div v-for="room in currentDungeon.rooms()" :key="room.id">
        <RoomComponent
          class="room"
          :id="room.id"
          :name="room.name"
          :effect="room.effect"
          :disabled="!currentRoom?.rooms?.has(room.id)"
          :active="currentRoom?.id === room.id"
          :venture="venture"
        />
      </div>
    </div>
    <button :disabled="currentRoom.id !== finalRoom.id" @click="handleCompleteDungeon">
      Complete the Dungeon
    </button>
    <component :is="EdgeComponent" v-for="edge in displayEdges" v-bind="edge"></component>
  </div>
</template>

<style>
#title {
  margin-bottom: 5em;
}

#container {
  position: flex;
}
</style>
