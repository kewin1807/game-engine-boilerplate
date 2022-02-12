// import "module-alias/register";
// import "reflect-metadata";

import { IPlayerModel, IPlayerSkillResult } from "@models/player/player.model";
// import { injectable } from "inversify";
import { IGameRepository } from "./IGameRepository";
import { db, dbLog } from "../connections";
import * as storedProcedureNames from "@repositories/stored.procedure.name";
import { ISkill } from "@models/skill/skill.model";
import logger from "@logger";
import { ApplicationError } from "@errors/app.error";
import { IBotModel } from "@models/bot/bot.model";
import { IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";

// @injectable()
export default class GameRepository implements IGameRepository {
    async logDataMatch(roomState: IHistoryRoomLogCreationModel): Promise<boolean> {
        try {
            const params = [roomState.create_at, roomState.player1Id, roomState.player2Id, roomState.typeMatch, roomState.messageLog, roomState.botId]
            await dbLog.func(storedProcedureNames.INSERT_MATCH_INFORMATION, params);
            return true;
        }
        catch (error: any) {

            logger.error(error.response.data || `insert history failed`)
            throw new ApplicationError(400, "Method not implemented.");
        }
    }
    async getBotById(botId: number): Promise<IBotModel> {
        try {
            const bots: IBotModel[] = await db.func(storedProcedureNames.GET_BOT_BY_ID, [botId])
            if (bots.length > 0) {
                return bots[0]
            }
            else {
                throw new ApplicationError(400, "no bots")
            }

        }
        catch (error: any) {
            logger.error(error.message || `get player skill errors with id: ${botId}`)
            throw new ApplicationError(400, "no bots")
        }
    }
    async getPlayerSkillById(playerId: number): Promise<IPlayerModel> {
        try {
            const result: IPlayerSkillResult[] = await db.func(storedProcedureNames.GET_PLAYER_SKILL_BY_ID, [playerId]);
            let player: IPlayerModel = { playerId: playerId, userName: result[0].user_name, skills: [] }
            if (result.length > 0) {
                const skills: ISkill[] = result.map(item => ({ id: item.skill_id, skillName: item.skill_name, damage: item.skill_damage }));
                player.skills = skills
            }
            return player;
        }
        catch (error: any) {
            logger.error(error.response.data || `get player skill errors with id: ${playerId}`)
            throw new ApplicationError(400, "Method not implemented.");
        }
    }
}