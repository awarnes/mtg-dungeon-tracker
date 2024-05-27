/**
 * Adapted from
 * https://github.com/sha1n/dagraph/blob/master/index.ts
 */

interface RoomData {
  readonly id: string;
  readonly name: string;
  readonly effect: string;
}

export class Room {
  readonly id: string;
  readonly name: string;
  readonly effect: string;

  constructor(data: RoomData, readonly rooms = new Set<string>()) {
    this.id = data.id;
    this.name = data.name;
    this.effect = data.effect;
  }
}

export class Dungeon {
  readonly name: string;
  private readonly roomsById = new Map<string, Room>();

  constructor(name: string) {
    this.name = name;
  }

  addRoom(data: RoomData): Dungeon {
    this.ensureRoom(data);

    return this;
  }

  getRoom(id: string): Room | undefined {
    return this.roomsById.get(id);
  }

  addPath(from: Room, to: Room): Dungeon {
    const fromRoom = this.ensureRoom(from);
    const toRoom = this.ensureRoom(to);

    fromRoom.rooms.add(toRoom.id);

    if (!this.isAcyclic()) {
      throw new Error(`[${from.id}] -> [${to.id}] form a cycle`);
    }

    return this;
  }

  *topologicalSort(): Iterable<Room> {
    const roomsById = this.roomsById;

    const visited = new Set<string>();
    const roomsOf = function* (room: Room): Iterable<Room> {
      for(const child of room.rooms || []) {
        if (!visited.has(child)) {
          yield* roomsOf(roomsById.get(child));
          yield roomsById.get(child);
          visited.add(child);
        }
      }
    }

    for (const room of roomsById.values()) {
      if (!visited.has(room.id)) {
        yield* roomsOf(room);
        yield room;
        visited.add(room.id);
      }
    }
  }

  private ensureRoom(data: Room): Room {
    const room = this.roomsById.get(data.id);
    if (room) {
      return room;
    }

    this.roomsById.set(data.id, data);
    return data;
  }

  private isAcyclic(): boolean {
    const degrees = new Map<string, number>();
    this.roomsById.forEach(room => degrees.set(room.id, 0));
    this.roomsById.forEach(room =>
      room.rooms.forEach(child => {
        degrees.set(child, degrees.get(child) + 1);
      })
    );

    const queue = new Array<string>();
    this.roomsById.forEach(room => {
      if (degrees.get(room.id) === 0) {
        queue.push(room.id);
      }
    });

    let visitedRoomCount = 0;

    while (queue.length > 0) {
      const [roomId] = queue.splice(0, 1);
      visitedRoomCount += 1;

      this.roomsById.get(roomId)?.rooms.forEach(room => {
        degrees.set(room, degrees.get(room) - 1);
        if (degrees.get(room) === 0) {
          queue.push(room);
        }
      })
    }

    return visitedRoomCount === this.roomsById.size;
  }
}