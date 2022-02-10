import { inject, injectable } from "inversify";
import { IGameService } from "./IGameService";
import { TYPES } from "../../types"
import { IGameRepository } from "@repositories/game/IGameRepository";
import { IBotModel } from "@models/bot/bot.model";
import { IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";
import { IPlayerModel } from "@models/player/player.model";
@injectable()
export default class GameService implements IGameService {
    @inject(TYPES.GameRepository) private gameRepository!: IGameRepository;
    async getPlayerById(playerId: number): Promise<IPlayerModel> {

        return await this.gameRepository.getPlayerSkillById(playerId)
    }
    async getBotById(botId: number): Promise<IBotModel> {
        return await this.gameRepository.getBotById(botId);
    }
    async saveRoomState(roomState: IHistoryRoomLogCreationModel): Promise<boolean> {
        return await this.gameRepository.logDataMatch(roomState);
    }

}