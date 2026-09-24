/**
 * Safe bootstrap — does NOT wipe user dossiers.
 * - Upserts Visa + University service catalogs
 * - Ensures an admin account exists (from env or defaults)
 *
 * Destructive reset: npm run seed:reset
 */
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/mongodb";
import { ensureServicesCatalog } from "../src/lib/services-catalog";
import { enrollClientInAllServices } from "../src/lib/enroll";
import { User } from "../src/models/User";
import { Service } from "../src/models/Service";
import { ServiceApplication } from "../src/models/ServiceApplication";
import { DocumentSubmission } from "../src/models/DocumentSubmission";

async function seed() {
  const reset = process.argv.includes("--reset");
  await connectDB();

  if (reset) {
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      ServiceApplication.deleteMany({}),
      DocumentSubmission.deleteMany({}),
    ]);
    console.log("All collections cleared.");
  }

  await ensureServicesCatalog();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "demo1234";
  const adminHash = await bcrypt.hash(adminPassword, 10);

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: "Admin EEF",
      email: adminEmail,
      passwordHash: adminHash,
      role: "ADMIN",
    });
    console.log(`Admin created: ${adminEmail}`);
  } else if (admin.role !== "ADMIN") {
    admin.role = "ADMIN";
    await admin.save();
    console.log(`Promoted to admin: ${adminEmail}`);
  } else {
    console.log(`Admin already exists: ${adminEmail}`);
  }

  if (reset) {
    const clientHash = await bcrypt.hash("demo1234", 10);
    const client = await User.create({
      name: "Sarah Benali",
      email: "sarah@example.com",
      passwordHash: clientHash,
      role: "CLIENT",
    });
    await enrollClientInAllServices(client._id);
    console.log("Demo client: sarah@example.com / demo1234");
  }

  console.log("Seed complete (data preserved unless --reset).");
  console.log(`Admin login: ${adminEmail}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
