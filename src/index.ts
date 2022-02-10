import "module-alias/register";
import { install as installSourceMapSupport } from "source-map-support";
installSourceMapSupport();
import "reflect-metadata";
import express from "express";
import compress from "compression";
import cors from "cors";
// import errorHandler from "./errors/error.handler";
import logger from "./logger";
import bodyParser from "body-parser";
import path from "path";
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport";
import { GamePvPRoom } from "@gameplay/rooms/room.pvp";
import { Server, RedisPresence } from "colyseus";
import { MongooseDriver } from "@colyseus/mongoose-driver";
import http from "http";
import { monitor } from "@colyseus/monitor";
import dotenv from "dotenv";

dotenv.config();





const app = express();
async function bootstrap() {
  app.disable("x-powered-by"); // Hide information
  app.use(compress()); // Compress
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "statics")));
  app.use("/colyseus", monitor())
}


// Invoking the bootstrap function
bootstrap()
  .then(() => {
    const gameServer = new Server({
      transport: new uWebSocketsTransport(),
      driver: new MongooseDriver(process.env.DB_MONGODB_URI),
      presence: new RedisPresence({ host: "localhost", port: Number(process.env.DB_REDIS_PORT) || 6379 }),
      server: http.createServer(app)
    });
    gameServer.define("battle", GamePvPRoom).enableRealtimeListing();
    gameServer.onShutdown(() => {
      logger.info("game server is going down")
    })
    gameServer.listen(Number(process.env.PORT || 3000));

    logger.info("Server is up");
  })
  .catch((error) => {
    logger.error("Unknown error. " + error.message);
  });
