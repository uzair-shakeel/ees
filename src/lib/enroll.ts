import mongoose from "mongoose";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

/** Enroll a client in every service with empty document slots (idempotent). */
export async function enrollClientInAllServices(userId: string | mongoose.Types.ObjectId) {
  const services = await Service.find({}).lean();
  for (const service of services) {
    let application = await ServiceApplication.findOne({
      userId,
      serviceId: service._id,
    });
    if (!application) {
      application = await ServiceApplication.create({
        userId,
        serviceId: service._id,
        status: "in_progress",
      });
    }
    for (const req of service.requirements) {
      await DocumentSubmission.updateOne(
        { applicationId: application._id, requirementKey: req.key },
        {
          $setOnInsert: {
            applicationId: application._id,
            requirementKey: req.key,
            status: "missing",
          },
        },
        { upsert: true },
      );
    }
  }
}
