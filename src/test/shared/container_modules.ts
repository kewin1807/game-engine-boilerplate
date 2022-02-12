import "module-alias/register";
import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();
import "reflect-metadata";
import GameRepository from "@repositories/game/game.repository";
import { IGameRepository } from "@repositories/game/IGameRepository";
import GameService from "@services/game/game.service";
import { IGameService } from "@services/game/IGameService";
import { ContainerModule } from "inversify";
import { TYPES } from "../../types";

const gameService = new ContainerModule((bind) => {
    bind<IGameService>(TYPES.GameService).to(GameService);
});

const gameRepository = new ContainerModule((bind) => {
    bind<IGameRepository>(TYPES.GameRepository).to(GameRepository);
});

export { gameService, gameRepository };
