import { IBotModel } from "@models/bot/bot.model";
import { IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";
import { IPlayerModel } from "@models/player/player.model";

export interface IGameService {
    getPlayerById(playerId: number): Promise<IPlayerModel>
    getBotById(botId: number): Promise<IBotModel>
    saveRoomState(roomState: IHistoryRoomLogCreationModel): Promise<boolean>
}