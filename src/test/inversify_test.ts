import "module-alias/register";
import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();
import "reflect-metadata";
import { gameService, gameRepository } from './shared/container_modules';
import { Container } from "inversify";
import { IGameService } from '@services/game/IGameService';
import { TYPES } from '../types';

describe("something", () => {

    let container: Container;

    beforeEach(() => {
        container = new Container();
        container.load(gameRepository, gameService);
    });

    afterEach(() => {
        container = new Container();
    });

    it("testing", async () => {
        const gameService: IGameService = container.get<IGameService>(TYPES.GameService);
        console.log(await gameService.getBotById(3))
        // do something
    });

});