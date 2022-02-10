import GameRepository from "@repositories/game/game.repository";
import { IGameRepository } from "@repositories/game/IGameRepository";
import GameService from "@services/game/game.service";
import { IGameService } from "@services/game/IGameService";
import { Container } from "inversify";
import { TYPES } from "./types";

const container = new Container({ defaultScope: "Singleton" });
// game
container.bind<IGameRepository>(TYPES.GameRepository).to(GameRepository);
container.bind<IGameService>(TYPES.GameService).to(GameService)



export default container;
