<template>
  <svg id="edge-svg">
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="3"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" :stroke="color" :fill="color" />
      </marker>
    </defs>
    <line
      id="edge"
      :x1="start.x"
      :y1="start.y"
      :x2="end.x"
      :y2="end.y"
      :stroke="color"
      :stroke-width="thickness"
      stroke-linecap="round"
      marker-end="url(#arrow)"
    />
  </svg>
</template>

<script setup lang="ts">
type Point = {
  x: number
  y: number
}
const { thickness, color, start, end } = defineProps<{
  thickness: number
  color: string
  start: Point
  end: Point
}>()
</script>

<style>
#edge-svg {
  pointer-events: none;

  width: 100%;
  height: 100%;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  position: absolute;
}
</style>
