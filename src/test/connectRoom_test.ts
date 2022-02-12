import "module-alias/register";
import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();
import "reflect-metadata";
import { ColyseusTestServer, boot } from "@colyseus/testing";
import { Server } from "colyseus";
import { GamePvERoom } from '@gameplay/rooms/room.pve'
import { MongooseDriver } from "@colyseus/mongoose-driver";
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport";
import dotenv from "dotenv";
import assert from "assert";


dotenv.config();

// let gameService: IGameService;
// const gameService: IGameService = container.get<IGameService>(TYPES.GameService);

describe("testing your Colyseus app", () => {
  let colyseus: ColyseusTestServer;
  const transport = new uWebSocketsTransport();

  const gameServer = new Server({
    transport,
    driver: new MongooseDriver(process.env.DB_MONGODB_URI),
    // presence: new RedisPresence(),
  });
  gameServer.define("battle-pve", GamePvERoom);
  after(async () => colyseus.shutdown());
  before(async () => { colyseus = await boot(gameServer) });
  beforeEach(async () => { await colyseus.cleanup() });

  it("connecting into a room", async () => {
    // `room` is the server-side Room instance reference.
    const room = await colyseus.createRoom("battle-pve", { enermyID: 3 });

    // // // `client1` is the client-side `Room` instance reference (same as JavaScript SDK)
    const client1 = await colyseus.connectTo(room);
    assert.strictEqual(client1.sessionId, room.clients[0].sessionId);
    // console.log(await gameRepository.getBotById(3))
    // console.log(await gameService.getBotById.bind(gameService, 3))

  });
});

