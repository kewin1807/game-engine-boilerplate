import { Schema, type } from "@colyseus/schema";
import { IEnermy } from "./IEnermy";

export class Enermy extends Schema implements IEnermy {
    @type('int16') id = -1;
    @type('string') name = "";
    @type('int16') health = 10;
    @type('int16') minDamage = 0;
    @type('int16') maxDamage = 1;
}