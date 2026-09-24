import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { MongoMemoryServer } from "mongodb-memory-server";

async function main() {
  const dbPath = path.join(process.cwd(), ".mongo-data");
  mkdirSync(dbPath, { recursive: true });

  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27018,
      dbPath,
      storageEngine: "wiredTiger",
    },
  });

  const uri = `${mongod.getUri()}mon-dossier`;
  writeFileSync(path.join(process.cwd(), ".mongo-uri"), uri, "utf8");
  console.log("MongoDB (memory) listening.");
  console.log("URI:", uri);
  console.log("Keep this process running, then: npm run seed && npm run dev");

  const stop = async () => {
    await mongod.stop();
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  await new Promise(() => {});
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
