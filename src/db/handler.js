import { connect, connection } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initializeLogger } from "../utils/logger";
import { initialLoad } from "./scripts";

const logger = initializeLogger("handler-js");
let mongod = undefined;
let isDbAvailable = true;

/**
 * Connect to the in-memory database.
 */
export async function connectDatabase() {
  let uri =
    process.env.ENV === "prod"
      ? process.env.MONGO_ONLINE_URL.replace("<username>", process.env.MUNAME)
          .replace("<password>", process.env.MPWD)
          .replace("<dbname>", process.env.DB_NAME)
      : undefined;

  try {
    if (process.env.ENV === "dev") {
      logger.debug("Connecting to local DB");
      mongod = new MongoMemoryServer({
        instance: { port: 53005, dbName: process.env.DB_NAME },
      });
      uri = await mongod.getConnectionString();
      // uri = "mongodb://localhost:27017/"+process.env.DB_NAME;
    } else if (process.env.ENV === "test") {
      logger.debug("Connecting to local Test DB");
      mongod = new MongoMemoryServer({
        instance: { dbName: process.env.DB_NAME },
      });
      uri = await mongod.getConnectionString();
    }

    const mongooseOpts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    logger.debug(`connecting to db at ${uri}`);
    await connect(uri, mongooseOpts);
    logger.debug(`connected to db at ${uri}`);
    isDbAvailable = true;
    if (process.env.ENV !== "prod") await initialLoad();
  } catch (err) {
    logger.error("Unable to connect to DB");
    logger.error(err);
  }
}

/**
 * Drop database, close the connection and stop mongod.
 */
export async function closeDatabase() {
  if (isDbAvailable && mongod && connection.db) {
    logger.debug("Closing DB connection");
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop();
    isDbAvailable = false;
  } else {
    logger.error("DB is not connected...");
  }
}

/**
 * Remove all the data for all db collections.
 */
export async function clearDatabase() {
  try {
    if (isDbAvailable && mongod && connection.db) {
      const collections = connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
      }
    }
  } catch (err) {
    logger.error(`Error in clearing DB`, err);
  }
}
