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
        proof_of_income: "pending",
        passport: "pending",
        passport_photo: "approved",
        housing_proof: "rejected",
        admission_letter: "missing",
        insurance: "missing",
      },
      university: {
        school_certificate: "approved",
        grades_certificate: "pending",
        motivation_letter: "missing",
        cv: "approved",
        id_document: "approved",
        language_proof: "missing",
      },
    },
    comments: {
      "visa:housing_proof": "Le scan est illisible. Envoyez une version couleur, pages complètes.",
    },
  },
  {
    name: "Amine El Fassi",
    email: "amine@example.com",
    slots: {
      visa: {
        proof_of_income: "approved",
        passport: "approved",
        passport_photo: "approved",
        housing_proof: "pending",
        admission_letter: "approved",
        insurance: "missing",
      },
      university: {
        school_certificate: "approved",
        grades_certificate: "approved",
        motivation_letter: "approved",
        cv: "approved",
        id_document: "approved",
        language_proof: "approved",
      },
    },
    comments: {},
  },
  {
    name: "Lina Traoré",
    email: "lina@example.com",
    slots: {
      visa: {
        proof_of_income: "missing",
        passport: "pending",
        passport_photo: "missing",
        housing_proof: "missing",
        admission_letter: "rejected",
        insurance: "missing",
      },
      university: {
        school_certificate: "pending",
        grades_certificate: "rejected",
        motivation_letter: "missing",
        cv: "missing",
        id_document: "missing",
        language_proof: "missing",
      },
    },
    comments: {
      "visa:admission_letter": "La lettre ne mentionne pas l'année universitaire.",
      "university:grades_certificate": "Il manque le relevé de la dernière année.",
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
