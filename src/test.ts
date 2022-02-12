// import { IGameRepository } from "@repositories/game/IGameRepository";
import "module-alias/register";
import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();
import "reflect-metadata";
import { IGameService } from "@services/game/IGameService";
import { TYPES } from "./types";
import { Container, inject, injectable } from "inversify";
import { IGameRepository } from "@repositories/game/IGameRepository";
import GameRepository from "@repositories/game/game.repository";
import { IBotModel } from "@models/bot/bot.model";
import { IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";
import { IPlayerModel } from "@models/player/player.model";
@injectable()
class GameService implements IGameService {
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
const container = new Container({ defaultScope: "Singleton" });
// game
container.bind<IGameRepository>(TYPES.GameRepository).to(GameRepository)
container.bind<IGameService>(TYPES.GameService).to(GameService)

// const gameRepository: IGameRepository = container.get<IGameRepository>(TYPES.GameRepository);
const gameService: IGameService = container.get<IGameService>(TYPES.GameService);
(async () => {
    console.log(gameService)
    console.log(await gameService.getBotById(3))
})()