import { Schema, type } from "@colyseus/schema";

export class Enermy extends Schema {
    @type('int16') id: number = -1;
    @type('string') name: string = "";
    @type('float32') health: number = 10;
    @type('int16') minDamage: number = 0;
    @type('int16') maxDamage: number = 1;
    @type('int16') positionX: number = 800;
    @type('int16') positionY: number = 400;
    public constructor(id: number, name: string, health: number, minDamage: number, maxDamage: number) {
        super();
        this.id = id;
        this.name = name;
        this.health = health;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
    }
    public get getId() {
        return this.id;
    }
    public get getName() {
        return this.name;
    }
    public get getHealth() {
        return this.health;
    }
    public get getMinDamage() {
        return this.minDamage;
    }
    public get getMaxDamage() {
        return this.maxDamage;
    }
    public get getXPosition() {
        return this.positionX;
    }
    public get getYPosition() {
        return this.positionY;
    }
}