<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

import LostMine from "../dungeons/LostMine";

for (const room of LostMine.topologicalSort()) {
  console.log(room);
  console.log(room.rooms);
}

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
