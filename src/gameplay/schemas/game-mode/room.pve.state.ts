import { Schema, type } from "@colyseus/schema";
import { Enermy } from "../enermy/enermy.schema";
import { Player } from "../player/player.schema";

export class RoomPvEState extends Schema {
    @type('string')
    phase!: string;
    @type('string') playerTurn!: string;
    @type(Enermy) bot!: Enermy;
    @type(Player) player!: Player;
    @type("boolean") didWin!: boolean;

    public constructor() {
        super();
    }
}