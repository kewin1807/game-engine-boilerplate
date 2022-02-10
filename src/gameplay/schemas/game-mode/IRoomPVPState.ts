import { Schema, MapSchema } from "@colyseus/schema";
import { IPlayer } from "@gameplay/schemas/player/IPlayer";

export interface IRoomPVPState extends Schema {
    phase: string;
    playerTurn: string;
    winningPlayer: IPlayer;
    players: MapSchema<IPlayer>,
}