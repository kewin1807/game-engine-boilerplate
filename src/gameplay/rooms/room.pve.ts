import { RoomPvEState } from "@gameplay/schemas/game-mode/room.pve.state";
import { Client, Room } from "colyseus";
import logger from "@logger";
import { Player } from "@gameplay/schemas/player/player.schema";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IGameService } from "@services/game/IGameService";
@injectable()
export class GamePvERoom extends Room<RoomPvEState>{
    @inject(TYPES.GameService) private gameService!: IGameService;
    maxClients = 1;
    playerCount: number = 0;
    autoDispose: boolean = false;

    onCreate(options: any) {
        console.log("room created!", options);
        this.reset();
    }
    // onAuth(client: Client, options: any, request?: IncomingMessage) {

    // }
    onJoin(client: Client) {
        logger.info(`client joined: ${client.sessionId}`);
        let player: Player = new Player();
        player.sessionId = client.sessionId;
        this.playerCount++;
        player.x = Math.floor(Math.random() * 400);
        player.y = Math.floor(Math.random() * 400);
        this.state.player = player;
        this.lock();
        this.state.playerTurn = "player";
    }
    onLeave(client: Client) {
        logger.info(`client left: ${client.sessionId}`);
        this.state.player = new Player();
        this.playerCount--;
        this.state.phase = "waiting";
    }
    onDispose() {
        logger.info("room destroyed");
    }

    private reset() {
        let state = new RoomPvEState();
        state.phase = "waiting";
        state.playerTurn = "bot";
        state.winningPlayer = new Player();
        state.bot = new Player({ name: "bot", x: 800, y: 400 });
        this.setState(state);
    }
    // private registerMessageHandler() {
    //     // this.onMessage("fire")
    // }
}