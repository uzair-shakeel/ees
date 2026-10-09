import { connectDB } from "@/lib/mongodb";
import { ensureServicesCatalog } from "@/lib/services-catalog";
import { Service } from "@/models/Service";
import { AdminSectionsEditor } from "@/components/AdminSectionsEditor";

export default async function AdminSectionsPage() {
  await connectDB();
  await ensureServicesCatalog();
  const services = await Service.find({}).sort({ title: 1 }).lean();

  return (
    <AdminSectionsEditor
      sections={services.map((service) => ({
        slug: service.slug,
        title: service.title,
        description: service.description,
        requirements: service.requirements.map((req) => ({
          key: req.key,
          label: req.label,
          description: req.description,
          required: req.required !== false,
        })),
      }))}
    />
  );
}
