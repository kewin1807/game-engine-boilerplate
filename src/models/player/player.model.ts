import { ISkill } from "@models/skill/skill.model"
export interface IPlayerModel {
    playerId: number;
    userName: string;
    skills?: ISkill[];
}

export interface IPlayerSkillResult {
    player_id: number;
    user_name: string;
    skill_id: number;
    skill_name: string;
    skill_damage: number;
}