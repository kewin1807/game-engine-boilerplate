import { RoomPvEState } from "@gameplay/schemas/game-mode/room.pve.state";
import { Client, Room } from "colyseus";
import logger from "@logger";
import { Player } from "@gameplay/schemas/player/player.schema";
// import { injectable } from "inversify";
// import { TYPES } from "../../types";
import { IGameService } from "@services/game/IGameService";
import { IBotModel } from "@models/bot/bot.model";
import { Enermy } from "@gameplay/schemas/enermy/enermy.schema";
import { IPlayerModel } from "@models/player/player.model";
import { ETypeMatch, IHistoryRoomLogCreationModel } from "@models/historyrooms/history.model";
import * as helper from "@utils/gameHelper";
import GameService from "@services/game/game.service";
// @injectable()
export class GamePvERoom extends Room<RoomPvEState>{
    private gameService: IGameService = new GameService();
    maxClients = 1;
    playerCount: number = 0;
    autoDispose: boolean = false;

    async onCreate(options: { enermyID: number }) {
        console.log("room created!", options);
        await this.reset(options.enermyID);
        this.onCombatMessages();

    }
    // onAuth(client: Client, options: any, request?: IncomingMessage) {

    // }
    async onJoin(client: Client, options: { userId: number }) {
        logger.info(`client joined: ${client.sessionId}`);
        const playerSkillDb: IPlayerModel = await this.gameService.getPlayerById(options.userId);
        console.log(playerSkillDb);
        let player: Player = new Player(playerSkillDb.skills!, playerSkillDb.userName, client.sessionId, Math.floor(Math.random() * 400), Math.floor(Math.random() * 400), 10);
        this.playerCount++;
        player.x = Math.floor(Math.random() * 400);
        player.y = Math.floor(Math.random() * 400);
        this.state.player = player;
        this.state.playerTurn = "player";
        this.lock();
    }
    onLeave(client: Client) {
        logger.info(`client left: ${client.sessionId}`);
        this.state.player = new Player([], "", "", 1, 2, 10);
        this.playerCount--;
        this.state.phase = "waiting";
    }
    onDispose() {
        logger.info("room destroyed");
    }

    private async reset(enermyID: number) {
        let state = new RoomPvEState();
        state.phase = "waiting";
        state.playerTurn = "bot";
        state.didWin = false;
        const enermyDb: IBotModel = await this.gameService.getBotById(enermyID);

        const newEnermyRoom = new Enermy(enermyDb.id, enermyDb.bot_name, enermyDb.health, enermyDb.min_damage, enermyDb.max_damage);
        newEnermyRoom.positionX = 800;
        newEnermyRoom.positionY = 400;
        state.bot = newEnermyRoom;
        this.setState(state);
    }
    private onCombatMessages() {
        this.onMessage("fire", async (_client: Client, message: { damage: number, skill_name: string }) => {
            if (this.state.playerTurn !== "player" || this.state.didWin) return;
            this.state.bot.health = this.state.bot.health - message.damage;
            let messageLog = `player ${this.state.player.name} attacked enermy ${this.state.bot.name} with skill name ${message.skill_name} and ${message.damage} damage`;
            let stateRoomLog: IHistoryRoomLogCreationModel = {
                create_at: Date.now(),
                player1Id: this.state.player!.playerId,
                player2Id: null,
                typeMatch: ETypeMatch.PVE,
                messageLog: messageLog,
                botId: this.state.bot.id
            }
            await this.gameService.saveRoomState(stateRoomLog)
            if (this.state.bot.health <= 0) {
                this.state.didWin = true;
                this.state.phase = "done"
                messageLog = `player ${this.state.player.name} won bot ${this.state.bot.name}`
                stateRoomLog.messageLog = messageLog;
                stateRoomLog.create_at = Date.now();
                this.broadcast("messages", messageLog);
                await this.gameService.saveRoomState(stateRoomLog)
            }
            else {
                this.state.playerTurn = "bot";
                this.broadcast("turn_for_bot", messageLog);
            }
        })

        this.onMessage("bot-attacked", async (_client: Client) => {
            const damageBotAttack = helper.getDamageEnermy(this.state.bot.minDamage, this.state.bot.maxDamage)
            this.state.player.currentHealth -= damageBotAttack
            let messageLog = `bot ${this.state.bot.name} attacked player ${this.state.player.name} with ${damageBotAttack} damage`;
            let stateRoomLog: IHistoryRoomLogCreationModel = {
                create_at: Date.now(),
                player1Id: this.state.player!.playerId,
                player2Id: null,
                typeMatch: ETypeMatch.PVE,
                messageLog: messageLog,
                botId: this.state.bot.id
            }
            await this.gameService.saveRoomState(stateRoomLog)
            this.broadcast("messages", messageLog);
            if (this.state.player.currentHealth < 0) {
                this.state.didWin = true;
                this.state.phase = "done";
                messageLog = `player ${this.state.player.name} was defeated by bot ${this.state.bot.name}`
                stateRoomLog.messageLog = messageLog;
                stateRoomLog.create_at = Date.now();
                await this.gameService.saveRoomState(stateRoomLog)
                this.broadcast("messages", messageLog);
            }

            else {
                this.state.playerTurn = "player";
            }
        })
    }

    // private registerMessageHandler() {
    //     // this.onMessage("fire")
    // }
}