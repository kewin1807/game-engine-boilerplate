import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "../player/player.schema";
import { IRoomPVPState } from "./IRoomPVPState";

export class RoomPvPState extends Schema implements IRoomPVPState {
    @type('string') phase = 'waiting';
    @type('string') playerTurn = '';
    @type('int16') winningPlayer = new Player();
    @type({ map: Player }) players = new MapSchema<Player>();
}