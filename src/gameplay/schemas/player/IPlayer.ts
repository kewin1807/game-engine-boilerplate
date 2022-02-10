import { Schema } from "@colyseus/schema"
export interface IPlayer extends Schema {
    playerId: number;
    name: string;
    sessionId: string;
    x: number;
    y: number;
    currentHealth: number;
}