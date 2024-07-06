import { Dungeon, Room } from './Dungeon'

const entrance = new Room({
  id: 'entrance',
  name: 'Secret Entrance',
  effect:
    'Search your library for a basic land card, reveal it, put it into your hand, then shuffle.'
})

const forge = new Room({
  id: 'forge',
  name: 'Forge',
  effect: 'Put two +1/+1 counters on target creature.'
})

const well = new Room({
  id: 'well',
  name: 'Lost Well',
  effect: 'Scry 2.'
})

const trap = new Room({
  id: 'trap',
  name: 'Trap!',
  effect: 'Target player loses 5 life'
})

const arena = new Room({
  id: 'arena',
  name: 'Arena',
  effect: 'Goad target creature.'
})

const stash = new Room({
  id: 'stash',
  name: 'Stash',
  effect: 'Create a Treasure token.'
})

const archives = new Room({
  id: 'archives',
  name: 'Archives',
  effect: 'Draw a card.'
})

const catacombs = new Room({
  id: 'catacombs',
  name: 'Catacombs',
  effect: 'Create a 4/1 black Skeleton creature token with menace.'
})

const throne = new Room({
  id: 'throne',
  name: 'Throne of the Dead Three',
  effect:
    'Reveal the top ten cards of your library. Put a creature card from among them onto the battlefield, then put three +1/+1 counters on it. It gains hexproof until your next turn. Then shuffle.'
})

export default new Dungeon('Undercity')
  .addPath(entrance, forge)
  .addPath(entrance, well)
  .addPath(forge, trap)
  .addPath(forge, arena)
  .addPath(well, arena)
  .addPath(well, stash)
  .addPath(trap, archives)
  .addPath(arena, archives)
  .addPath(arena, catacombs)
  .addPath(stash, catacombs)
  .addPath(archives, throne)
  .addPath(catacombs, throne)
