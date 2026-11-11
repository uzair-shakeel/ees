/**
 * One-shot: copy all collections from SOURCE_URI → TARGET_URI.
 * Usage:
 *   SOURCE_URI=... TARGET_URI=... npx tsx scripts/migrate-mongo.ts
 */
import { MongoClient } from "mongodb";

const SOURCE_URI = process.env.SOURCE_URI;
const TARGET_URI = process.env.TARGET_URI;
const SOURCE_DB = process.env.SOURCE_DB || "mon-dossier";
const TARGET_DB = process.env.TARGET_DB || "mon-dossier";

async function main() {
  if (!SOURCE_URI || !TARGET_URI) {
    throw new Error("SOURCE_URI and TARGET_URI are required");
  }

  const source = new MongoClient(SOURCE_URI);
  const target = new MongoClient(TARGET_URI);

  await source.connect();
  await target.connect();

  const srcDb = source.db(SOURCE_DB);
  const dstDb = target.db(TARGET_DB);

  const collections = (await srcDb.listCollections().toArray()).map((c) => c.name);
  console.log(`Source DB "${SOURCE_DB}": ${collections.length} collections`);

  for (const name of collections) {
    if (name.startsWith("system.")) continue;
    const docs = await srcDb.collection(name).find({}).toArray();
    const dst = dstDb.collection(name);
    await dst.deleteMany({});
    if (docs.length) {
      await dst.insertMany(docs, { ordered: false });
    }

    const indexes = await srcDb.collection(name).indexes();
    for (const idx of indexes) {
      if (idx.name === "_id_") continue;
      const { key, name: indexName, ...rest } = idx;
      const opts: Record<string, unknown> = { name: indexName };
      for (const field of [
        "unique",
        "sparse",
        "expireAfterSeconds",
        "partialFilterExpression",
        "collation",
      ] as const) {
        if (rest[field] !== undefined) opts[field] = rest[field];
      }
      try {
        await dst.createIndex(key, opts);
      } catch (err) {
        console.warn(`  index ${indexName} on ${name}:`, (err as Error).message);
      }
    }

    console.log(`  ${name}: ${docs.length} docs`);
  }

  await source.close();
  await target.close();
  console.log(`Done → ${TARGET_DB} on target`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
