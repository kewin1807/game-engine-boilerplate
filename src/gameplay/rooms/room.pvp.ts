import { RoomPvPState } from "@gameplay/schemas/game-mode/room.pvp.state";
import { Client, Room } from "colyseus";
import logger from "@logger";
import { Player } from "@gameplay/schemas/player/player.schema";

export class GamePvPRoom extends Room<RoomPvPState>{
    maxClients = 2;
    startingHealth: number = 10;
    playerCount: number = 0;
    autoDispose: boolean = false;

    onCreate(options: any) {
        console.log("room created!", options);
        this.reset();
        this.registerMessageHandler();
    }
    onJoin(client: Client, options: any) {
        logger.info(`client joined: ${client.sessionId}`);
        console.log("options", options);
        let player: Player = new Player();
        player.sessionId = client.sessionId;



        this.playerCount++;
        if (this.playerCount == 1) {
            player.x = Math.floor(Math.random() * 400);
            player.y = Math.floor(Math.random() * 400);
        }
        else {
            player.x = 500;
            player.y = 500;
        }
        this.state.players.set(player.sessionId, player);
        if (this.playerCount == 2) {
            this.state.phase = 'battle';

            this.state.playerTurn = Object.keys(this.state.players)[Math.floor(Math.random() * Object.keys(this.state.players).length)]
            this.lock();
        }
    }

    onLeave(client: Client) {
        logger.info(`client left: ${client.sessionId}`);
        this.state.players.delete(client.sessionId);
        this.playerCount--;
        this.state.phase = "waiting";
    }
    onDispose() {
        logger.info("room destroyed");
    }


    private reset() {
        let state = new RoomPvPState();
        state.phase = "waiting";
        state.playerTurn = "";
        state.winningPlayer = new Player();
        this.setState(state);
    }

    private registerMessageHandler() {
        this.onMessage("fire", (client: Client, message: number) => {
            if (this.state.playerTurn !== client.sessionId) return;
            const currentPlayer = this.state.players.get(client.sessionId)!;
            const currentHealth = currentPlayer!.currentHealth;
            currentPlayer!.currentHealth = currentHealth ? currentHealth - message : 0;
            this.state.players.set(client.sessionId, currentPlayer!);
            if (currentPlayer!.currentHealth! <= 0) {
                this.state.winningPlayer = this.state.players.get(client.sessionId)!;
                this.state.phase = "result";
            }
            else {
                this.state.playerTurn = Object.keys(this.state.players).filter(item => item != client.sessionId)[0];
            }
        })
    }


}