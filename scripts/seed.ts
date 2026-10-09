/**
 * Safe bootstrap — does NOT wipe user dossiers.
 * - Upserts portal service catalogs
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
import { refreshApplicationStatus } from "../src/lib/application-status";

const DEMO_PASSWORD = "demo1234";

const DEMO_STUDENTS: {
  name: string;
  email: string;
  slots: Record<string, Record<string, "missing" | "pending" | "approved" | "rejected">>;
  comments: Record<string, string>;
}[] = [
  {
    name: "Sarah Benali",
    email: "sarah@example.com",
    slots: {
      visa: {
        passport: "pending",
        photo: "approved",
        family_record: "missing",
        admission: "missing",
        bac: "pending",
        latest_diploma: "missing",
        language: "approved",
        resources: "pending",
        residence: "rejected",
      },
      "private-university": {
        passport: "pending",
        photo: "approved",
        cv: "approved",
        bac: "pending",
        latest_diploma: "missing",
        transcripts: "pending",
        language: "approved",
        motivation: "missing",
      },
      "campus-france": {
        language: "approved",
        passport: "pending",
        bac: "pending",
        cv: "approved",
        motivation: "missing",
      },
      installation: {
        housing: "missing",
        cvec: "missing",
        school_registration: "missing",
        health: "pending",
        vls_validation: "missing",
      },
    },
    comments: {
      "visa:residence": "Le scan est illisible. Envoyez une version couleur, pages complètes.",
    },
  },
  {
    name: "Amine El Fassi",
    email: "amine@example.com",
    slots: {
      visa: {
        passport: "approved",
        photo: "approved",
        family_record: "approved",
        admission: "approved",
        bac: "approved",
        latest_diploma: "approved",
        language: "approved",
        resources: "approved",
        residence: "pending",
      },
      "private-university": {
        passport: "approved",
        photo: "approved",
        cv: "approved",
        bac: "approved",
        latest_diploma: "approved",
        transcripts: "approved",
        language: "approved",
        motivation: "approved",
      },
      "campus-france": {
        language: "approved",
        passport: "approved",
        bac: "approved",
        cv: "approved",
        motivation: "approved",
      },
      "tourist-visa": {
        passport: "approved",
        photo: "approved",
        flight: "pending",
        travel_insurance: "missing",
        resources: "approved",
        accommodation: "missing",
        current_status: "approved",
        trip_purpose: "missing",
      },
    },
    comments: {},
  },
  {
    name: "Lina Traoré",
    email: "lina@example.com",
    slots: {
      visa: {
        passport: "pending",
        photo: "missing",
        admission: "rejected",
        bac: "missing",
        language: "missing",
        resources: "missing",
        residence: "missing",
      },
      "private-university": {
        passport: "pending",
        cv: "missing",
        bac: "missing",
        transcripts: "rejected",
        language: "missing",
        motivation: "missing",
      },
      "campus-france": {
        language: "missing",
        passport: "pending",
        bac: "missing",
        cv: "missing",
        motivation: "missing",
      },
    },
    comments: {
      "visa:admission": "La lettre ne mentionne pas l'année universitaire.",
      "private-university:transcripts": "Il manque le relevé de la dernière année.",
    },
  },
];

async function seedDemoStudents(adminId: { toString(): string }) {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const services = await Service.find({}).lean();

  for (const demo of DEMO_STUDENTS) {
    let client = await User.findOne({ email: demo.email });
    if (!client) {
      client = await User.create({
        name: demo.name,
        email: demo.email,
        passwordHash,
        role: "CLIENT",
      });
    }
    await enrollClientInAllServices(client._id);

    for (const service of services) {
      const planned = demo.slots[service.slug];
      if (!planned) continue;
      const application = await ServiceApplication.findOne({
        userId: client._id,
        serviceId: service._id,
      });
      if (!application) continue;

      for (const [key, status] of Object.entries(planned)) {
        const comment = demo.comments[`${service.slug}:${key}`] ?? null;
        await DocumentSubmission.updateOne(
          { applicationId: application._id, requirementKey: key },
          {
            $set: {
              status,
              adminComment: status === "rejected" ? comment : null,
              originalFilename: status === "missing" ? null : `${key}.pdf`,
              reviewedAt: status === "approved" || status === "rejected" ? new Date() : null,
              reviewedBy: status === "approved" || status === "rejected" ? adminId : null,
            },
          },
        );
      }

      await refreshApplicationStatus(String(application._id), service.requirements);
    }

    console.log(`Demo student: ${demo.email} / ${DEMO_PASSWORD}`);
  }
}

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

  await seedDemoStudents(admin._id);

  console.log("Seed complete (data preserved unless --reset).");
  console.log(`Admin login: ${adminEmail}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
