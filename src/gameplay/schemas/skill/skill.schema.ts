import { Schema, type } from "@colyseus/schema"
export class SkillGame extends Schema {
    @type('int16') id: number = -1;
    @type('string') skillName: string = "";
    @type('float32') damage: number = 0;
    public constructor(id: number, skillName: string, damage: number) {
        super();
        this.id = id;
        this.skillName = skillName;
        this.damage = damage;
    }
    public get getId() {
        return this.id;
    }
    public get getSkillName() {
        return this.skillName;
    }
    public get getDamage() {
        return this.damage;
    }
}