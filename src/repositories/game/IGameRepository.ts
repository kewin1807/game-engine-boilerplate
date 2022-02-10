import { IBotModel } from "@models/bot/bot.model";
import { IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";
import { IPlayerModel } from "@models/player/player.model";
export interface IGameRepository {
    getPlayerSkillById(playerId: number): Promise<IPlayerModel>
    getBotById(botId: number): Promise<IBotModel>
    logDataMatch(roomState: IHistoryRoomLogCreationModel): Promise<boolean>;
}