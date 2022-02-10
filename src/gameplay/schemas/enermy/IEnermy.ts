import { Schema } from "@colyseus/schema";
export interface IEnermy extends Schema {
    id: number;
    name: string;
    health: number;
    minDamage: number;
    maxDamage: number;
}