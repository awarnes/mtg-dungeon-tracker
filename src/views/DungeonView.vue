<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import RoomComponent from '@/components/RoomComponent.vue'
import EdgeComponent, { Point } from '@/components/EdgeComponent.vue'
import { Room } from '@/dungeons/Dungeon'
import { useGameStore } from '@/stores/game'

type Edge = {
  color: string
  thickness: number
  start: Point
  end: Point
}

const route = useRoute()
const router = useRouter()

const { state, increment } = useGameStore()

const displayEdges = ref<Edge[]>([])

const currentDungeon = computed(() => {
  return state[route.params.id as string].dungeon
})

const currentRoom = ref<Room>(currentDungeon.value.rooms().next().value)
const finalRoom = computed(() => currentDungeon.value.topologicalSort().next().value)
const visited = ref<string[]>([currentRoom.value.id])

function venture(id: string) {
  visited.value.push(id)
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

function createEdges(
  fromElement: Element,
  toElement: Element,
  color: string,
  thickness: number
): Edge {
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

      displayEdges.value.push(createEdges(fromRoomRef, toRoomRef, 'grey', 4))
    }
  }
}

const currentRooms = ref<Room[]>([])

onBeforeMount(() => {
  currentDungeon.value.assignLevels([currentRoom.value.id])

  for (const room of currentDungeon.value.rooms()) {
    currentRooms.value.push(room)
  }
})

onMounted(() => {
  connectNodes()
})
</script>

<template>
  <div id="container">
    <h1>{{ currentDungeon.name }}</h1>
    <RouterLink to="/">Back</RouterLink>
    <div id="rooms">
      <div
        class="level"
        v-for="level in [...Array(finalRoom.level + 1).keys()].slice(1)"
        :key="level"
      >
        <div v-for="room in currentRooms.filter((rm) => rm.level === level)" :key="room.id">
          <RoomComponent
            class="room"
            :id="room.id"
            :name="room.name"
            :effect="room.effect"
            :disabled="!currentRoom?.rooms?.has(room.id)"
            :active="currentRoom?.id === room.id"
            :visited="visited.includes(room.id)"
            :venture="venture"
          />
        </div>
      </div>
    </div>
    <button
      id="complete"
      :disabled="currentRoom.id !== finalRoom.id"
      @click="handleCompleteDungeon"
    >
      Complete the Dungeon
    </button>
    <Component v-for="edge in displayEdges" :is="EdgeComponent" v-bind="edge" :key="edge.start.x" />
  </div>
</template>

<style>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.level {
  display: flex;
  padding-top: 2em;
  justify-content: space-evenly;
  align-content: space-between;
}

#complete {
  margin-top: 1em;
}
</style>
