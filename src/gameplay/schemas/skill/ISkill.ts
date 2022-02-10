import { Schema } from "@colyseus/schema";
export interface ISkill extends Schema {
    id: number;
    skillName: string;
    damage: number;
}