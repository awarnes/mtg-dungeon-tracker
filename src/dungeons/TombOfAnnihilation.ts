import { Dungeon, Room } from './Dungeon'

const entry = new Room({
  id: 'entry',
  name: 'Trapped Entry',
  effect: 'Each player loses 1 life.'
})

const veils = new Room({
  id: 'veils',
  name: 'Veils of Fear',
  effect: 'Each player loses 2 life unless they discard a card.'
})

const oubliette = new Room({
  id: 'oubliette',
  name: 'Oubliette',
  effect: 'Discard a card and sacrifice an artifact, a create, and a land.'
})

const cell = new Room({
  id: 'cell',
  name: 'Sandfall Cell',
  effect: 'Each player loses 2 life unless they sacrifice an artifact, a creature, or aa land.'
})

const cradle = new Room({
  id: 'cradle',
  name: 'Cradle of the Death God',
  effect: 'Create The Atropal, a legendary 4/4 black God Horror creature token with deathtouch.'
})

export default new Dungeon('Tomb of Annihilation', 'tomb')
  .addPath(entry, veils)
  .addPath(entry, oubliette)
  .addPath(veils, cell)
  .addPath(cell, cradle)
  .addPath(oubliette, cradle)
