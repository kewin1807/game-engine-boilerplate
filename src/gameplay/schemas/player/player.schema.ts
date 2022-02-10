import { Schema, type } from "@colyseus/schema"
import { IPlayer } from "./IPlayer";
export class Player extends Schema implements IPlayer {
    @type('string') name = "";
    @type('string') sessionId = "";
    @type('int16') x = 1;
    @type('int16') y = 2;
    @type("int16") currentHealth = 10;
    @type("int16") playerId = -1
}