import {Dungeon, Room} from './Dungeon';

const cave = new Room({
  id: 'cave',
  name: 'Cave Entrance',
  effect: 'Scry 1.'
});

const lair = new Room({
  id: 'lair',
  name: 'Goblin Lair',
  effect: 'Create a 1/1 redd Goblin creature token.'
});

const tunnels = new Room({
  id: 'tunnels',
  name: 'Mine Tunnels',
  effect: 'Create a Treasure token.'
});

const storeroom = new Room({
  id: 'storeroom',
  name: 'Storeroom',
  effect: 'Put a +1/+1 counter on target creature.'
});

const pool = new Room({
  id: 'pool',
  name: 'Dark Pool',
  effect: 'Each opponent loses 1 life and you gain 1 life.'
});

const fungi = new Room({
  id: 'fungi',
  name: 'Fungi Cavern',
  effect: 'Target creature gets -4/-0 until your next turn.'
});

const temple = new Room({
  id: 'temple',
  name: 'Temple of Dumathoin',
  effect: 'Draw a card.'
});

export default new Dungeon('Lost Mine of Phandelver')
  .addPath(cave, lair)
  .addPath(cave, tunnels)
  .addPath(lair, storeroom)
  .addPath(lair, pool)
  .addPath(tunnels, pool)
  .addPath(tunnels, fungi)
  .addPath(storeroom, temple)
  .addPath(pool, temple)
  .addPath(fungi, temple);