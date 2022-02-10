import { Schema, type } from "@colyseus/schema";
import { Player } from "../player/player.schema";
import { IRoomPVEState } from "./IRoomPvEState";

export class RoomPvEState extends Schema implements IRoomPVEState {
    @type('string') phase = 'waiting';
    @type('string') playerTurn = '';
    @type(Player) winningPlayer = new Player();
    @type(Player) bot = new Player({ name: "bot", x: 800, y: 400 });
    @type(Player) player = new Player();
}