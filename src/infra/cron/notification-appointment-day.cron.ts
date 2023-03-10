import cron from "node-cron";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/prisma/appointment.prisma.repository";

cron.schedule("0 0 0 * * *", async () => {
  const appointmentRepository = new AppointmentPrismaRepository();
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(appointmentRepository);

  await createNotificationAppointmentUseCase.execute();
});
