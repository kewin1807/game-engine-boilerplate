import { Schema, type } from "@colyseus/schema"
import { ISkill } from "./ISkill";
export class SkillGame extends Schema implements ISkill {
    @type('int16') id = -1;
    @type('string') skillName = "";
    @type('float32') damage = 0;
}