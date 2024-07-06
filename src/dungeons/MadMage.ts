import { Dungeon, Room } from './Dungeon'

const portal = new Room({
  id: 'portal',
  name: 'Yawning Portal',
  effect: 'You gain 1 life.'
})

const dungeon = new Room({
  id: 'dungeon',
  name: 'Dungeon Level',
  effect: 'Scry 1.'
})

const bazaar = new Room({
  id: 'bazaar',
  name: 'Goblin Bazaar',
  effect: 'Create a Treasure token.'
})

const twisted = new Room({
  id: 'twisted',
  name: 'Twisted Caverns',
  effect: "Target creature can't attack until your next turn."
})

const lost = new Room({
  id: 'lost',
  name: 'Lost Level',
  effect: 'Scry 2.'
})

const runestone = new Room({
  id: 'runestone',
  name: 'Runestone Caverns',
  effect: 'Exile the top two cards of your library. You may play them.'
})

const graveyard = new Room({
  id: 'graveyard',
  name: "Muriel's Graveyard",
  effect: 'Create two 1/1 black Skeleton creature tokens.'
})

const mines = new Room({
  id: 'mines',
  name: 'Deep Mines',
  effect: 'Scry 3.'
})

const lair = new Room({
  id: 'lair',
  name: "Mad Wizard's Lair",
  effect: 'Draw three cards and reveal them. You may cast one of them without paying its mana cost.'
})

export default new Dungeon('Dungeon of the Mad Mage', 'mad-mage')
  .addPath(portal, dungeon)
  .addPath(dungeon, bazaar)
  .addPath(dungeon, twisted)
  .addPath(bazaar, lost)
  .addPath(twisted, lost)
  .addPath(lost, runestone)
  .addPath(lost, graveyard)
  .addPath(runestone, mines)
  .addPath(graveyard, mines)
  .addPath(mines, lair)
