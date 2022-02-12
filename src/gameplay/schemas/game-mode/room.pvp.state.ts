import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "../player/player.schema";

export class RoomPvPState extends Schema {
    @type('string') phase = 'waiting';
    @type('string') playerTurn = '';
    @type({ map: Player }) players = new MapSchema<Player>();
}