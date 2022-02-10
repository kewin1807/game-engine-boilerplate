import { Schema } from "@colyseus/schema";
import { IPlayer } from "@gameplay/schemas/player/IPlayer";

export interface IRoomPVEState extends Schema {
    phase: string;
    playerTurn: string;
    bot: IPlayer;
    winningPlayer: IPlayer;
    player: IPlayer;
}