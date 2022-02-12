import { Schema, type, ArraySchema } from "@colyseus/schema"
import { ISkill } from "@models/skill/skill.model";
import { SkillGame } from "../skill/skill.schema";
export class Player extends Schema {
    @type('string') name = "";
    @type('string') sessionId = "";
    @type('int16') x = 1;
    @type('int16') y = 2;
    @type("float32") currentHealth = 10;
    @type("int16") playerId = -1
    @type({ array: SkillGame }) skills = new ArraySchema<SkillGame>();
    public constructor(skills: ISkill[], name: string, sessionId: string, x: number, y: number, currentHealth: number) {
        super();
        this.name = name;
        this.sessionId = sessionId;
        this.x = x;
        this.y = y;
        this.currentHealth = currentHealth;
        this.skills = new ArraySchema<SkillGame>(...skills.map(item => new SkillGame(item.id, item.skillName, Number(item.damage))));
    }
    public get getCurrentHealth() {
        return this.currentHealth;
    }
    public get getName() {
        return this.name;
    }
    public get getSkills() {
        return this.skills;
    }
    public get getXPosition() {
        return this.x;
    }
    public get getYPosition() {
        return this.y;
    }

}